"use client";
import { useEffect, useState } from "react";

export default function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/ppdb/pendaftar", { cache: "no-store" });
      if (!res.ok) return;
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div>
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className=" bg-blue-600 text-white">
            <th className="p-4 text-left font-medium">Nama</th>
            <th className="p-4 text-left font-medium">NISN</th>
            <th className="p-4 text-left font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="p-8 text-center text-gray-500 bg-gray-50">
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Belum ada pendaftar
                </div>
              </td>
            </tr>
          )}

          {data.map((item, index) => (
            <tr 
              key={item.id} 
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
            >
              <td className="p-4 border-b border-gray-200">{item.nama_lengkap}</td>
              <td className="p-4 border-b border-gray-200 font-mono">{item.nisn}</td>
              <td className="p-4 border-b border-gray-200">
                <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                  ${item.status_verifikasi === "verifikasi"
                    ? "bg-green-100 text-green-800"
                    : item.status_verifikasi === "tolak"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                  }
                `}>
                  {item.status_verifikasi || "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}