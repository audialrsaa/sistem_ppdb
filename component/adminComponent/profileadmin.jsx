import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connection from "@/app/lib/db";

export default async function ProfileAdminPage() {
  const session = await getServerSession(authOptions);

  // Jika belum login
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="bg-white p-10 rounded-xl shadow-xl max-w-sm text-center border-t-4 border-blue-500">
          <p className="text-xl font-semibold text-gray-800">
            Anda harus login terlebih dahulu.
          </p>
        </div>
      </div>
    );
  }

  // Pastikan role admin
  if (session.user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="bg-white p-10 rounded-xl shadow-xl max-w-sm text-center border-t-4 border-red-500">
          <p className="text-xl font-semibold text-gray-800">
            Anda bukan admin.
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
        <p className="text-xl text-red-500 bg-white p-6 rounded shadow">
          Gagal mengambil data.
        </p>
      </div>
    );
  }

  if (!rows.length) {
    return <p>Data admin tidak ditemukan.</p>;
  }

  const admin = rows[0];

  // UI
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Profil Admin
        </h1>

        <form className="space-y-6 bg-white p-6 rounded-xl shadow-lg border">
          <div>
            <label className="block font-medium text-gray-700">Nama</label>
            <input
              value={admin.nama}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              value={admin.email}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Nomor HP</label>
            <input
              value={admin.no_telp || "-"}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Role</label>
            <input
              value={admin.role}
              readOnly
              className="w-full p-3 border rounded-lg bg-gray-50"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
