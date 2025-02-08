import { createClient } from '@supabase/supabase-js';

function getLast7Days() {
    const days: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(
        date.toLocaleDateString("de-DE", {
          month: "short",
          day: "numeric",
        })
      );
    }
    return days;
  }
  
  export function createSupabaseClient() {
    return createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
  }
  
  export async function getCallsData() {
    try {
      const supabase = createSupabaseClient();
  
      // Get total calls
      const { count: totalCalls } = await supabase
        .from("calls")
        .select("*", { count: "exact" });
  
      // Get appointments booked
      const { count: appointmentsBooked } = await supabase
        .from("calls")
        .select("*", { count: "exact" })
        .eq("appointment_booked", true);
  
      // Get average duration and rating
      const { data: averages } = await supabase
        .from("calls")
        .select("duration, rating")
        .not("duration", "is", null)
        .not("rating", "is", null);
  
      const avgDuration =
        averages?.reduce((acc, curr) => acc + curr.duration, 0) || 0;
      const avgRating =
        averages?.reduce((acc, curr) => acc + curr.rating, 0) || 0;
  
      // Get weekly call volume (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
      const { data: dailyCalls } = await supabase
        .from("calls")
        .select("start_time")
        .gte("start_time", sevenDaysAgo.toISOString());
  
      // Get all possible last 7 days
      const last7Days = getLast7Days();
  
      // Group calls by date
      const callsByDate = dailyCalls?.reduce(
        (acc: Record<string, number>, curr) => {
          const date = new Date(curr.start_time).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {}
      );
  
      // Create array with all days, filling in zeros for missing days
      const weeklyCallVolume = last7Days.map((date) => ({
        date,
        calls: callsByDate?.[date] || 0,
      }));
  
      // Get recent calls
      const { data: recentCalls } = await supabase
        .from("calls")
        .select("*")
        .order("start_time", { ascending: false })
        .limit(5);
  
      return {
        totalCalls: totalCalls || 0,
        appointmentsBooked: appointmentsBooked || 0,
        averageCallDuration: avgDuration / (averages?.length || 1) / 60, // Convert to minutes
        averageRating: avgRating / (averages?.length || 1),
        weeklyCallVolume,
        recentCalls: recentCalls || [],
      };
    } catch (err) {
      console.error("Error fetching call data:", err);
      throw err;
    }
  }
  