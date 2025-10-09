import StatCards from "../dashboard/StatCards";
import ThreatMap from "../dashboard/ThreatMap";
import AlertsTable from "../dashboard/AlertsTable";
import SecurityMetrics from "../dashboard/SecurityMetrics";
import SystemStatus from "../dashboard/SystemStatus";

export default function Dashboard() {
  return (
    <section className="space-y-8">
      <StatCards />
      <ThreatMap />
      <AlertsTable />
      <SecurityMetrics />
      <SystemStatus />
    </section>
  );
}