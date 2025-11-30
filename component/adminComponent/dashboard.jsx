"use client";
import { useEffect, useState } from "react";
import TableUser from "./tableUser";
import { FaUsers, FaUserShield, FaShieldAlt, FaTrash, FaExclamationTriangle } from "react-icons/fa";

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
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>

        {/* STATISTIK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <FaUsers className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-500 text-xs font-medium">Total Users</h3>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <FaUserShield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-500 text-xs font-medium">Total Petugas</h3>
                <p className="text-2xl font-bold text-gray-800">{petugas.length}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white shadow rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                <FaShieldAlt className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-gray-500 text-xs font-medium">Status Sistem</h3>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <p className="text-lg font-bold text-emerald-600">Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE USERS */}
        <div className="mb-8">
          <TableUser />
        </div>

        {/* TABLE PETUGAS */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 bg-green-50">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaUserShield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">Tabel Petugas</h2>
                <p className="text-xs text-gray-600">
                  Total {petugas.length} petugas terdaftar
                </p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-16">ID</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-28">Nama</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-36">Email</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-24">No Telp</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-20">Role</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-20">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {petugas.map((p) => (
                  <tr key={p.id_petugas} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                    <td className="p-2 w-16">
                      <span className="text-xs font-medium text-gray-900 bg-gray-100 px-1 py-0.5 rounded">
                        {p.id_petugas}
                      </span>
                    </td>
                    <td className="p-2 w-28">
                      <div className="text-sm font-semibold text-gray-900 truncate" title={p.nama}>
                        {p.nama}
                      </div>
                    </td>
                    <td className="p-2 w-36">
                      <div className="text-xs text-gray-600 truncate flex items-center" title={p.email}>
                        {p.email}
                      </div>
                    </td>
                    <td className="p-2 w-24">
                      <div className="text-xs text-gray-700 truncate flex items-center" title={p.no_telp}>
                        {p.no_telp}
                      </div>
                    </td>
                    <td className="p-2 w-20">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {p.role}
                      </span>
                    </td>
                    <td className="p-2 w-20">
                      <button
                        onClick={() => deletePetugas(p.id_petugas)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center w-full justify-center"
                      >
                        <FaTrash className="w-3 h-3 mr-1" />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}

                {petugas.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <FaExclamationTriangle className="w-8 h-8 text-gray-300 mb-2" />
                        <p className="text-sm font-medium">Tidak ada data petugas</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Data petugas akan muncul di sini setelah ditambahkan
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-600">
              Menampilkan <span className="font-semibold">{petugas.length}</span> petugas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}