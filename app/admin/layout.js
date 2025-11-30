"use client";

import AdminSidebar from "@/component/adminComponent/SidebarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
