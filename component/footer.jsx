"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#E8EEF9] border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand + Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={45}
                height={45}
                className="object-contain"
              />
              <div className="font-semibold text-sm">
                <p>Sistem PPDB</p>
                <p>SMK Taruna Bhakti</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              Pembelajaran praktik, fasilitas lengkap, dan dukungan dunia 
              industri untuk mencetak lulusan yang terampil, percaya diri, 
              dan siap kerja maupun kuliah.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 border-b pb-1 inline-block">
              Tautan Cepat
            </h4>

            <ul className="space-y-2 text-sm text-gray-700">
              <li><a href="#">About</a></li>
              <li><a href="#">Fasilitas</a></li>
              <li><a href="#">Daftar Sekarang</a></li>
              <li><a href="#">Periode</a></li>
              <li><a href="#">Jurusan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 border-b pb-1 inline-block">
              Hubungi Kami
            </h4>

            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin size={16} />
                <span>Jl. Pekapuran No. 123, Depok</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} />
                <span>Email: taruna@smktarunabhakti.net</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} />
                <span>(021) 12345678</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-5">
              <i className="ri-instagram-fill text-xl"></i>
              <i className="ri-facebook-fill text-xl"></i>
              <i className="ri-twitter-fill text-xl"></i>
              <i className="ri-youtube-fill text-xl"></i>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
