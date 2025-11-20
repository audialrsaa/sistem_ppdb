"use client";

import { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login diproses...");
  };

  return (
    <div
      className="min-h-screen  bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 relative"
    >
        <Image
            src="/images/background.jpg"
            alt="Gedung Sekolah"
            fill
            className="object-cover brightness-85"
            priority
            />

      {/* CARD LOGIN GLASSMORPHISM */}
      <div className="w-full max-w-md bg-white/35 backdrop-blur-xs border border-white/40 shadow-2xl rounded-2xl p-8 space-y-6 relative z-10">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">Login</h1>
          <p className="text-white/90 mt-1 text-sm drop-shadow">
            Masukkan akun Anda untuk melanjutkan
          </p>
        </div>

        {/* Form Login */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Username / NISN */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/90 drop-shadow">
              Username / NISN
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Masukkan username atau NISN"
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/40 backdrop-blur-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 placeholder-gray-600"
              />
              <User className="w-5 h-5 absolute right-3 top-3 text-gray-700" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/90 drop-shadow">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Masukkan password"
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/40 backdrop-blur-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 placeholder-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-blue-700/90 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Link pendaftaran */}
        <p className="text-center text-sm text-white/90 drop-shadow">
          Calon siswa baru?{" "}
          <a href="/registrasi" className="text-blue-200 font-semibold underline">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
}
