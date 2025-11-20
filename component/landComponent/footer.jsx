"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // ikon X terbaru

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Logo SMK Taruna Bhakti"
                width={45}
                height={45}
                className="object-contain"
              />
              <div>
                <h3 className="font-bold text-lg leading-tight">Sistem PPDB</h3>
                <p className="text-white/80 text-sm">SMK Taruna Bhakti</p>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed">
              Mencetak lulusan terampil, percaya diri, dan siap kerja maupun kuliah.
            </p>

            <div className="flex items-center gap-3 mt-4">
              {[
                { Icon: FaInstagram, color: "#E1306C" },
                { Icon: FaFacebookF, color: "#1877F2" },
                { Icon: FaXTwitter, color: "#000000" },
                { Icon: FaYoutube, color: "#FF0000" },
              ].map(({ Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-all shadow-sm hover:shadow"
                >
                  <Icon size={18} style={{ color }} />
                </a>
              ))}
            </div>
          </div>

          {/* TAUTAN */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wide">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              {["Tentang", "Fasilitas", "Daftar", "Periode", "Jurusan"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* VISI */}
          <div>
            <h4 className="font-semibold mb-3 text-sm tracking-wide">Visi</h4>
            <p className="text-white/70 text-xs leading-relaxed">
              Menghasilkan lulusan yang kompeten dalam IPTEK dan IMTAQ serta mampu
              bersaing pada tingkat nasional dan global.
            </p>
          </div>

          {/* MISI */}
          <div>
            <h4 className="font-semibold mb-3 text-sm tracking-wide">Misi</h4>
            <ul className="text-white/70 text-xs space-y-1 leading-relaxed">
              <li>• Menumbuhkan semangat kreatifitas, bersinergi dan kompetitif.</li>
              <li>• Melaksanakan kurikulum berbasis kompetensi & wirausaha.</li>
              <li>• Meningkatkan kualitas SDM melalui sertifikasi kompetensi.</li>
              <li>• Mengembangkan potensi peserta didik melalui minat & bakat.</li>
              <li>• Menerapkan layanan prima dalam manajemen sekolah.</li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT AREA */}
        <div className="pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* CONTACT */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-300" />
                <span className="text-xs">Jl. Pekapuran No. 123, Depok</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-blue-300" />
                <span className="text-xs">taruna@smktarunabhakti.net</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-blue-300" />
                <span className="text-xs">(021) 8744810</span>
              </div>
            </div>

            {/* COPYRIGHT */}
            <p className="text-white/60 text-xs">
              © 2025 SMK Taruna Bhakti
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
