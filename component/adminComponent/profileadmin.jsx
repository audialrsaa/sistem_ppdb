import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connection from "@/app/lib/db";
import { FaUser, FaEnvelope, FaPhone, FaShieldAlt, FaExclamationTriangle, FaLock } from "react-icons/fa";

export default async function ProfileAdminPage() {
  const session = await getServerSession(authOptions);

  // Jika belum login
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border-t-4 border-blue-500">
          <FaExclamationTriangle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Akses Ditolak</h2>
          <p className="text-gray-600">
            Anda harus login terlebih dahulu untuk mengakses halaman ini.
          </p>
        </div>
      </div>
    );
  }

  // Pastikan role admin
  if (session.user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border-t-4 border-red-500">
          <FaLock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Akses Dibatasi</h2>
          <p className="text-gray-600">
            Anda tidak memiliki akses admin untuk mengakses halaman ini.
          </p>
        </div>
      </div>
    );
  }

  const adminId = session.user.id;

  let rows = [];
  try {
    const conn = await connection();
    [rows] = await conn.execute(
      "SELECT id_petugas, nama, email, no_telp, role FROM petugas WHERE id_petugas = ?",
      [adminId]
    );
    await conn.end();
  } catch (err) {
    console.error(err);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border-t-4 border-red-500">
          <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h2>
          <p className="text-gray-600">
            Gagal mengambil data profil. Silakan coba lagi nanti.
          </p>
        </div>
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <FaExclamationTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Data Tidak Ditemukan</h2>
          <p className="text-gray-600">
            Data admin tidak ditemukan dalam sistem.
          </p>
        </div>
      </div>
    );
  }

  const admin = rows[0];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <FaUser className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profil Admin</h1>
          <p className="text-gray-600">Informasi detail akun administrator</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaShieldAlt className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Informasi Profil</h2>
                <p className="text-sm text-gray-600">Data pribadi administrator sistem</p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="p-6 space-y-6">
            {/* Nama Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaUser className="w-4 h-4 mr-2 text-gray-500" />
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  value={admin.nama}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">Read Only</span>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaEnvelope className="w-4 h-4 mr-2 text-gray-500" />
                Email
              </label>
              <div className="relative">
                <input
                  value={admin.email}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">Read Only</span>
                </div>
              </div>
            </div>

            {/* No Telp Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaPhone className="w-4 h-4 mr-2 text-gray-500" />
                Nomor Telepon
              </label>
              <div className="relative">
                <input
                  value={admin.no_telp || "-"}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">Read Only</span>
                </div>
              </div>
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FaShieldAlt className="w-4 h-4 mr-2 text-gray-500" />
                Role
              </label>
              <div className="relative">
                <input
                  value={admin.role}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {admin.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                ID Admin: <span className="font-mono font-semibold">{admin.id_petugas}</span>
              </div>
              <div className="text-xs">
                Terakhir dilihat: {new Date().toLocaleDateString('id-ID')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}