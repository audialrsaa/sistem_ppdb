import DashboardCards from "@/component/petugasComponent/dashboardcard";
import DataTable from "@/component/petugasComponent/dataTable";

export default function PetugasDashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard Petugas</h1>

      <DashboardCards />

      <h2 className="text-2xl font-bold mt-12 mb-4">Pendaftar Terbaru</h2>
      <DataTable />

    </>
  );
}
