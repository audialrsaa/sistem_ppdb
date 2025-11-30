"use client";
import { useEffect, useState } from "react";
import TableUser from "./tableUser";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [petugas, setPetugas] = useState([]);

  // Load Users
  async function loadUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  // Load Petugas
  async function loadPetugas() {
    const res = await fetch("/api/petugas");
    const data = await res.json();
    setPetugas(data);
  }

  async function deleteUser(id) {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadUsers();
  }

  async function deletePetugas(id) {
    await fetch(`/api/petugas/${id}`, { method: "DELETE" });
    loadPetugas();
  }

  useEffect(() => {
    loadUsers();
    loadPetugas();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      {/* STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-gray-600 text-sm">Total Users</h3>
          <p className="text-4xl font-bold mt-2">{users.length}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-gray-600 text-sm">Total Petugas</h3>
          <p className="text-4xl font-bold mt-2">{petugas.length}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-gray-600 text-sm">Admin & Sistem</h3>
          <p className="text-green-600 font-bold text-xl mt-2">Online</p>
        </div>

      </div>

      {/* TABLE USERS */}
      <div className="mb-8">
        <TableUser />
      </div>

      {/* TABLE PETUGAS */}
      <h2 className="text-2xl font-bold mb-4">Tabel Petugas</h2>

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {petugas.map((p) => (
            <tr key={p.id_petugas} className="border-b">
              <td className="p-3">{p.id_petugas}</td>
              <td className="p-3">{p.nama}</td>
              <td className="p-3">{p.email}</td>
              <td className="p-3">{p.role}</td>
              <td className="p-3">
                <button
                  onClick={() => deletePetugas(p.id_petugas)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
