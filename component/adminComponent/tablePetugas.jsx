"use client";

import { useEffect, useState } from "react";

export default function TablePetugas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noTelp, setNoTelp] = useState("");

  async function loadData() {
    const res = await fetch("/api/petugas");
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/petugas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama,
        email,
        password,
        no_telp: noTelp,
      }),
    });

    const result = await res.json();
    alert(result.message || result.error);

    setNama("");
    setEmail("");
    setPassword("");
    setNoTelp("");

    loadData();
  }

  async function deletePetugas(id) {
    if (!confirm("Yakin ingin menghapus petugas ini?")) return;

    const res = await fetch(`/api/petugas/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();
    alert(result.message || result.error);

    loadData();
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold mb-6">Tabel Petugas</h1>

      {/* FORM TAMBAH */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Tambah Petugas</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Nama lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="No Telepon"
          value={noTelp}
          onChange={(e) => setNoTelp(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah Petugas
        </button>
      </form>

      {/* TABEL PETUGAS */}
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">No Telp</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p) => (
            <tr key={p.id_petugas} className="border-b">
              <td className="p-3">{p.id_petugas}</td>
              <td className="p-3">{p.nama}</td>
              <td className="p-3">{p.email}</td>
              <td className="p-3">{p.no_telp}</td>
              <td className="p-3">{p.role}</td>
              <td className="p-3">
                <button
                  onClick={() => deletePetugas(p.id_petugas)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
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
