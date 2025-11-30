"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaUserPlus, FaUsers, FaPhone, FaEnvelope, FaLock, FaUser, FaExclamationTriangle, FaUserShield } from "react-icons/fa";

export default function TablePetugas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noTelp, setNoTelp] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      const res = await fetch("/api/petugas");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
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

      // Reset form
      setNama("");
      setEmail("");
      setPassword("");
      setNoTelp("");

      loadData();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menambah petugas");
    } finally {
      setSubmitting(false);
    }
  }

  async function deletePetugas(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus petugas ini?")) return;

    try {
      const res = await fetch(`/api/petugas/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      alert(result.message || result.error);
      loadData();
    } catch (error) {
      console.error("Error deleting petugas:", error);
      alert("Terjadi kesalahan saat menghapus petugas");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaUsers className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Data Petugas</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Total {data.length} petugas terdaftar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FORM TAMBAH PETUGAS */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FaUserPlus className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Tambah Petugas Baru</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaUser className="w-4 h-4 mr-2 text-gray-500" />
                Nama Lengkap
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Masukkan nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaEnvelope className="w-4 h-4 mr-2 text-gray-500" />
                Email
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Masukkan email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaLock className="w-4 h-4 mr-2 text-gray-500" />
                Password
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Masukkan password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaPhone className="w-4 h-4 mr-2 text-gray-500" />
                No Telepon
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Masukkan nomor telepon"
                value={noTelp}
                onChange={(e) => setNoTelp(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium text-sm flex items-center"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menambahkan...
                </>
              ) : (
                <>
                  <FaUserPlus className="w-4 h-4 mr-2" />
                  Tambah Petugas
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* TABEL PETUGAS */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200 bg-green-50">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaUserShield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Tabel Petugas</h2>
              <p className="text-xs text-gray-600">
                Total {data.length} petugas terdaftar
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
              {data.map((p) => (
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

              {data.length === 0 && (
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
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Menampilkan <span className="font-semibold">{data.length}</span> petugas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}