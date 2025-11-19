"use client";

export default function PeriodePendaftaran() {
  return (
    <div className="w-full py-24 bg-gradient-to-b from-[#f4f7fb] to-[#e9eef6]">

      <h2 className="text-center text-3xl md:text-4xl font-semibold text-blue-900 tracking-wide mb-14">
        Periode Pendaftaran
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-6">

        <div className="
          bg-white/60 
          backdrop-blur-xl 
          rounded-[2rem]
          p-8 
          shadow-[0_8px_30px_rgb(0,0,0,0.08)]
          border border-white/40
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
          hover:bg-white/70
          transition-all
          flex flex-col items-center
        ">
          <h3 className="text-xl font-semibold text-blue-900">
            Gelombang 1
          </h3>

          <p className="mt-2 text-blue-900/80 font-medium text-center">
            01 Oktober 2025 — 28 Februari 2026
          </p>

          <p className="mt-5 text-sm text-blue-900/70">
            Total Pembiayaan: <span className="font-semibold">Rp 4.800.000</span>
          </p>
        </div>

        <div className="
          bg-white/60 
          backdrop-blur-xl 
          rounded-[2rem]
          p-8 
          shadow-[0_8px_30px_rgb(0,0,0,0.08)]
          border border-white/40
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
          hover:bg-white/70
          transition-all
          flex flex-col items-center
        ">
          <h3 className="text-xl font-semibold text-blue-900">
            Gelombang 2
          </h3>

          <p className="mt-2 text-blue-900/80 font-medium text-center">
            01 Maret 2026 — 09 Juli 2026
          </p>

          <p className="mt-5 text-sm text-blue-900/70">
            Total Pembiayaan: <span className="font-semibold">Rp 5.000.000</span>
          </p>
        </div>

      </div>
    </div>
  );
}
