export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard PPDB</h1>
              <p className="text-gray-500 mt-1">SMK Taruna Bhakti • Tahun Ajaran 2025/2026</p>
            </div>
          </div>
          
          <div className="h-px bg-gray-200"></div>
        </div>

        {/* Info Sekolah - Redesigned */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-8">
            {/* Header Card */}
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Informasi Penerimaan Peserta Didik Baru
                </h2>
                <p className="text-gray-600">
                  Portal resmi pendaftaran SMK Taruna Bhakti untuk tahun ajaran 2024/2025
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Selamat datang di portal PPDB SMK Taruna Bhakti. Tahun ini kami membuka pendaftaran untuk 
                6 program keahlian unggulan dengan fasilitas terbaik dan kurikulum berbasis industri. 
                Pendaftaran dibuka mulai <span className="font-medium text-gray-900">1 Januari hingga 31 Maret 2024</span>.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-md border border-gray-200">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">Periode Pendaftaran</h3>
                </div>
                <div className="pl-11">
                  <p className="text-sm text-gray-600 mb-1">1 Januari - 31 Maret 2024</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Sedang Berlangsung</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-md border border-gray-200">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">Kuota Penerimaan</h3>
                </div>
                <div className="pl-11">
                  <p className="text-sm text-gray-600 mb-1">Terbatas per program keahlian</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Segera daftar</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-md border border-gray-200">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900">Akreditasi Sekolah</h3>
                </div>
                <div className="pl-11">
                  <p className="text-sm text-gray-600 mb-1">A - Unggul Nasional</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Terakreditasi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}