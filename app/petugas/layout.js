import Sidebar from "@/component/petugasComponent/sidebarpetugas";

export default function PetugasLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-white min-h-screen">
        {children}
      </main>
    </div>
  );
}
