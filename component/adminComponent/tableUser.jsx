"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaUsers, FaExclamationTriangle } from "react-icons/fa";

export default function TableUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("User berhasil dihapus!");
        loadUsers();
      } else {
        alert("Gagal menghapus user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Terjadi kesalahan saat menghapus user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-blue-50">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FaUsers className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Data User</h1>
            <p className="text-xs text-gray-600">
              Total {data.length} user terdaftar
            </p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-16">ID</th>
              <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-28">Nama</th>
              <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-36">Email</th>
              <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-24">NISN</th>
              <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-24">JK</th>
              <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-32">Asal Sekolah</th>
              <th className="p-2 text-left text-xs font-semibold text-gray-600 uppercase w-20">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((u, index) => (
              <tr 
                key={u.id} 
                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
              >
                <td className="p-2 w-16">
                  <span className="text-xs font-medium text-gray-900 bg-gray-100 px-1 py-0.5 rounded">
                    {u.id}
                  </span>
                </td>
                <td className="p-2 w-28">
                  <div className="text-sm font-semibold text-gray-900 truncate" title={u.nama}>
                    {u.nama}
                  </div>
                </td>
                <td className="p-2 w-36">
                  <div className="text-xs text-gray-600 truncate" title={u.email}>
                    {u.email}
                  </div>
                </td>
                <td className="p-2 w-24">
                  <div className="text-xs text-gray-900 font-mono">{u.nisn}</div>
                </td>
                <td className="p-2 w-24">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    u.jenis_kelamin === 'Laki-laki' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-pink-100 text-pink-800'
                  }`}>
                    {u.jenis_kelamin === 'Laki-laki' ? 'L' : 'P'}
                  </span>
                </td>
                <td className="p-2 w-32">
                  <div className="text-xs text-gray-700 truncate" title={u.asal_sekolah}>
                    {u.asal_sekolah}
                  </div>
                </td>
                <td className="p-2 w-20">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs flex items-center w-full justify-center"
                  >
                    <FaTrash className="w-3 h-3 mr-1" />
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <FaExclamationTriangle className="w-8 h-8 text-gray-300 mb-2" />
                    <p className="text-sm font-medium">Tidak ada data user</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Data user akan muncul di sini setelah terdaftar
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
          Menampilkan <span className="font-semibold">{data.length}</span> user
        </div>
      </div>
    </div>
  );
}