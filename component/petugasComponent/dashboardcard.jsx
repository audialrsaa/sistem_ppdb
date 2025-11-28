import { getDashboardStats } from "@/app/lib/action";

export default async function DashboardCards() {
  const result = await getDashboardStats();

  if (!result.success) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
        <p className="text-red-600">Error: {result.error}</p>
      </div>
    );
  }

  const stats = result.data;

  const items = [
    { 
      title: "Total Pendaftar", 
      value: stats?.totalPendaftar || 0,
      description: "Seluruh calon siswa",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600"
    },
    { 
      title: "Lulus Verifikasi", 
      value: stats?.lulusVerifikasi || 0,
      description: "Sudah diverifikasi",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-600"
    },
    { 
      title: "Belum Diverifikasi", 
      value: stats?.belumDiverifikasi || 0,
      description: "Menunggu verifikasi",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-600"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <div 
          key={i} 
          className={`p-6 rounded-xl shadow hover:shadow-lg transition-shadow border-2 ${item.bgColor} ${item.borderColor}`}
        >
          <h3 className={`text-lg font-semibold ${item.textColor}`}>{item.title}</h3>
          <p className="text-2xl font-bold mt-3 text-gray-800">{item.value}</p>
          <p className="text-sm text-gray-500 mt-2">{item.description}</p>
        </div>
      ))}
    </div>
  );
}