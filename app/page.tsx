import Dashboard from "../components/co/ui/dashboard";
import { getCallsData } from "./dashboard/supabase/getCallsData";

export default async function Page() {
  const stats = await getCallsData();
  return <Dashboard stats={stats} />;
}