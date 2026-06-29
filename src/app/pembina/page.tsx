"use client";

import { useState, useEffect } from "react";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Activity,
  ArrowUpRight,
  MoreVertical,
  Loader2
} from "lucide-react";

interface Stat {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

interface Validation {
  type: string;
  title: string;
  status: string;
  time: string;
}

const iconMap = [AlertCircle, CheckCircle, Clock, Activity];
const colorMap = [
  { color: "text-rose-600", bgColor: "bg-rose-100" },
  { color: "text-emerald-600", bgColor: "bg-emerald-100" },
  { color: "text-amber-600", bgColor: "bg-amber-100" },
  { color: "text-indigo-600", bgColor: "bg-indigo-100" },
];

export default function PembinaDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [validations, setValidations] = useState<Validation[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard/pembina");
        const data = await res.json();
        setStats(data.stats || []);
        setValidations(data.recentValidations || []);
        setChartData(data.chartData || []);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Pembina</h1>
        <p className="text-slate-500 text-sm mt-1">Selamat datang kembali, Bapak/Ibu Pembina! Berikut ringkasan validasi konten hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = iconMap[index] || Activity;
          const colors = colorMap[index] || colorMap[0];
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-slate-800 mt-2">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${colors.bgColor}`}>
                  <Icon className={`w-5 h-5 ${colors.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className={`flex items-center gap-1 font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4 rotate-90" />}
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Statistik Validasi Konten</h3>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 h-64 mt-auto">
            {chartData.map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full bg-slate-100 rounded-t-sm relative flex items-end justify-center h-full">
                  <div 
                    className="w-full bg-indigo-500 rounded-t-sm group-hover:bg-indigo-600 transition-colors"
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
            <h3 className="text-lg font-bold text-slate-800">Riwayat Validasi</h3>
          </div>
          
          {validations.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">Belum ada riwayat</p>
          ) : (
            <div className="space-y-6">
              {validations.map((activity, index) => (
                <div key={index} className="flex gap-4">
                  <div className="relative mt-1">
                    <div className={`w-2.5 h-2.5 rounded-full ring-4 z-10 relative ${
                      activity.status === 'Approved' ? 'bg-emerald-500 ring-emerald-50' : 
                      activity.status === 'Rejected' ? 'bg-rose-500 ring-rose-50' : 
                      'bg-amber-500 ring-amber-50'
                    }`}></div>
                    {index !== validations.length - 1 && (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-full bg-slate-200"></div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-slate-800">
                      <span className="font-semibold">[{activity.type}]</span> {activity.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{activity.status} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <button className="w-full mt-6 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
            Lihat Semua Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}
