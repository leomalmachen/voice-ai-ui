"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../lib/card";
import { PhoneCall, Calendar, Clock, Star, LucideIcon, TrendingUp } from "lucide-react";
import { CallDataTable } from "./call-data-table.tsx";
import { formatDuration } from "../../../app/api/utils/formatters";
import { BarChartComponent } from "./bar-chart";
import { Call } from "../../types/call";
import { supabase } from '../../../app/dashboard/supabase/supabaseClient';

interface DashboardProps {
  stats: {
    totalCalls: number;
    appointmentsBooked: number;
    averageCallDuration: number;
    averageRating: number;
    weeklyCallVolume: { date: string; calls: number }[];
    recentCalls: Call[];
  };
}

export default function Dashboard({ stats }: DashboardProps) {
  const [calls, setCalls] = useState<Call[]>([]);

  useEffect(() => {
    const fetchCalls = async () => {
      const { data, error } = await supabase
        .from('calls')
        .select('from_number, to_number, summary, appointments_booked');

      if (error) {
        console.error('Error fetching calls:', error);
      } else if (data) {
        setCalls(data as Call[]);
      }
    };

    fetchCalls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-6 space-y-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Real Estate Call Dashboard
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>Overall trend up by 3.8%</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Total Calls"
            value={stats.totalCalls}
            icon={PhoneCall}
            trend={+5.2}
          />
          <KpiCard
            title="Appointments Booked"
            value={stats.appointmentsBooked}
            icon={Calendar}
            trend={+2.1}
          />
          <KpiCard
            title="Average Call Duration"
            value={formatDuration(stats.averageCallDuration)}
            icon={Clock}
            trend={-0.5}
          />
          <KpiCard
            title="Average Rating"
            value={stats.averageRating.toFixed(1)}
            icon={Star}
            trend={+0.2}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="shadow-lg shadow-gray-200/50 dark:shadow-gray-900/30">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Weekly Call Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BarChartComponent data={stats.weeklyCallVolume} />
            </CardContent>
          </Card>
        </div>

        <CallDataTable data={stats.recentCalls} />
      </div>
    </div>
  );
}

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: number;
}

function KpiCard({ title, value, icon: Icon, trend }: KpiCardProps) {
  const trendColor = trend >= 0 ? "text-green-500" : "text-red-500";
  return (
    <Card className="shadow-md shadow-gray-200/50 dark:shadow-gray-900/30 hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trendColor} flex items-center mt-1`}>
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
          <span className="text-gray-500 dark:text-gray-400 ml-1">from last week</span>
        </p>
      </CardContent>
    </Card>
  );
}
