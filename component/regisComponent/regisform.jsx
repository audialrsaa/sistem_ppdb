"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      
      if (res.ok) {
        if (typeof window !== 'undefined') {
          alert("✅ Pendaftaran Berhasil!\n\nSilakan tunggu verifikasi admin dan login setelah mendapatkan email konfirmasi.");
        }
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        setMessage(data.message || "Terjadi kesalahan!");
      }

    } catch (error) {
      setMessage("Gagal menghubungi server!");
    }

    setLoading(false);
  }

  const handleBackToLanding = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background.jpg"
          alt="Gedung Sekolah"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={handleBackToLanding}
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-gray-200 transition-colors z-20 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali
      </button>

      {/* Form Container - Lebar */}
      <div className="mt-10 w-full max-w-5xl bg-white/90 backdrop-blur-sm border border-white/20 shadow-2xl rounded-xl p-8 space-y-6 relative z-10">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Formulir Pendaftaran</h1>
          <p className="text-gray-600 mt-2 text-base">
            Isi data diri dengan benar untuk pendaftaran siswa baru
          </p>
        </div>

        {message && (
          <div className="p-4 bg-red-50 text-red-700 text-center border border-red-200 rounded-lg text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Kolom 1 */}
          <div className="space-y-4">
            {/* Nama */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input
                name="nama"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Email Aktif</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                placeholder="contoh@email.com"
              />
            </div>

            {/* NISN */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">NISN</label>
              <input
                name="nisn"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                placeholder="Nomor Induk Siswa Nasional"
              />
            </div>

            {/* Asal Sekolah */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Asal Sekolah</label>
              <input
                name="asal_sekolah"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                placeholder="SMP/MTs asal"
              />
            </div>

            {/* Tempat lahir */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Tempat Lahir</label>
              <input
                name="tempat"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                placeholder="Kota tempat lahir"
              />
            </div>
          </div>

          {/* Kolom 2 */}
          <div className="space-y-4">
            {/* Tanggal lahir */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
              <input
                type="date"
                name="tanggal_lahir"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              />
            </div>

            {/* Jenis kelamin */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
              <select
                name="jenis_kelamin"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              >
                <option value="" disabled>Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Agama */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Agama</label>
              <input
                name="agama"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                placeholder="Agama"
              />
            </div>

            {/* Nama ortu */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Nama Orang Tua/Wali</label>
              <input
                name="nama_orang_tua"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                placeholder="Nama lengkap orang tua/wali"
              />
            </div>

            {/* Pekerjaan ortu */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Pekerjaan Orang Tua/Wali</label>
              <input
                name="pekerjaan_orang_tua"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                placeholder="Pekerjaan orang tua/wali"
              />
            </div>
          </div>

          {/* Kolom 3 */}
          <div className="space-y-4">
            {/* HP orang tua */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">No HP Orang Tua</label>
              <input
                name="no_hp_ortu"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            {/* HP siswa */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">No HP Calon Siswa</label>
              <input
                name="no_hp_casis"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">Buat Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
                placeholder="Password minimal 6 karakter"
              />
            </div>

            {/* Upload file */}
            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 flex flex-col gap-3">
              <label className="font-medium text-gray-700 text-sm">
                Upload Bukti Pembayaran
              </label>

              <input
                type="file"
                name="bukti_pembayaran"
                required
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />

              <p className="text-xs text-gray-500">Format: JPG, PNG, PDF (Max 2MB)</p>
            </div>
          </div>

          {/* Alamat - Full Width */}
          <div className="lg:col-span-3 flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
            <textarea
              name="alamat"
              required
              className="w-full px-4 py-3 min-h-[100px] border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder-gray-500"
              placeholder="Alamat lengkap tempat tinggal"
            />
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-colors text-lg ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Mengirim Data...
                </div>
              ) : (
                "Daftar Sekarang"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}