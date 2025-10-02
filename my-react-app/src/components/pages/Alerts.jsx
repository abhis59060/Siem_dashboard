import AlertsTable from "../dashboard/AlertsTable";

export default function Alerts() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Security Alerts</h1>
      <AlertsTable />
    </section>
  );
}
