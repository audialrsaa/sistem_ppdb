"use client";

import { useEffect, useState } from "react";

export default function TableUser() {
  const [data, setData] = useState([]);

  const loadUsers = async () => {
    const res = await fetch("/api/users");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin mau hapus user?")) return;

    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("User berhasil dihapus!");
      loadUsers();
    } else {
      alert("Gagal menghapus user");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tabel User</h1>

      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">NISN</th>
            <th className="p-3 text-left">Jenis Kelamin</th>
            <th className="p-3 text-left">Asal Sekolah</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-3">{u.id}</td>
              <td className="p-3">{u.nama}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.nisn}</td>
              <td className="p-3">{u.jenis_kelamin}</td>
              <td className="p-3">{u.asal_sekolah}</td>

              <td className="p-3">
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-4">
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
