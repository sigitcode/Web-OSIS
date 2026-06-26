import { 
  Users, 
  Newspaper, 
  CalendarDays, 
  Activity,
  ArrowUpRight,
  MoreVertical
} from "lucide-react";

const stats = [
  {
    title: "Total Berita",
    value: "156",
    change: "+12%",
    isPositive: true,
    icon: Newspaper,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Agenda Bulan Ini",
    value: "14",
    change: "+2",
    isPositive: true,
    icon: CalendarDays,
    color: "text-amber-600",
    bgColor: "bg-amber-100"
  },
  {
    title: "Pengunjung",
    value: "8,234",
    change: "+18%",
    isPositive: true,
    icon: Users,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100"
  },
  {
    title: "Aktivitas User",
    value: "432",
    change: "-5%",
    isPositive: false,
    icon: Activity,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  }
];

const recentActivities = [
  { user: "Budi Santoso", action: "menambahkan berita baru", target: "Prestasi LKS Nasional 2024", time: "10 menit yang lalu" },
  { user: "Siti Aminah", action: "memperbarui agenda", target: "Rapat Pleno OSIS", time: "1 jam yang lalu" },
  { user: "Admin", action: "menghapus galeri", target: "Kegiatan Classmeet 2023", time: "3 jam yang lalu" },
  { user: "Andi Saputra", action: "menambahkan ekstrakurikuler", target: "Pramuka", time: "Kemarin, 14:30" },
  { user: "Budi Santoso", action: "mengubah struktur", target: "Divisi Humas", time: "Kemarin, 10:15" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1">Selamat datang kembali, Admin! Berikut ringkasan aktivitas sistem hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-800 mt-2">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className={`flex items-center gap-1 font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4 rotate-90" />}
                  {stat.change}
                </span>
                <span className="text-slate-400">vs bulan lalu</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Mock Chart Section */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Statistik Publikasi</h3>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 h-64 mt-auto">
            {/* Mock Bars */}
            {[40, 70, 45, 90, 65, 85, 110, 60, 80, 50, 75, 100].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full bg-slate-100 rounded-t-sm relative flex items-end justify-center h-full">
                  <div 
                    className="w-full bg-primary-500 rounded-t-sm group-hover:bg-primary-600 transition-colors"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Aktivitas Terbaru</h3>
          </div>
          
          <div className="space-y-6">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex gap-4">
                <div className="relative mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-500 ring-4 ring-accent-50 z-10 relative"></div>
                  {index !== recentActivities.length - 1 && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-full bg-slate-200"></div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-slate-800">
                    <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-medium text-primary-600">{activity.target}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>
    </div>
  );
}
