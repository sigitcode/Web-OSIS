"use client";

import { useState, useEffect } from "react";
import { 
  Newspaper, 
  CalendarDays, 
  ClipboardList, 
  ImagePlus,
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  Loader2
} from "lucide-react";

interface Stat {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

interface Task {
  task: string;
  status: string;
  time: string;
}

interface Activity {
  action: string;
  target: string;
  time: string;
}

const iconMap = [Newspaper, CalendarDays, ClipboardList, ImagePlus];
const colorMap = [
  { color: "text-blue-600", bgColor: "bg-blue-100" },
  { color: "text-amber-600", bgColor: "bg-amber-100" },
  { color: "text-emerald-600", bgColor: "bg-emerald-100" },
  { color: "text-purple-600", bgColor: "bg-purple-100" },
];

export default function PengurusDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard/pengurus");
        const data = await res.json();
        setStats(data.stats || []);
        setPendingTasks(data.pendingTasks || []);
        setActivities(data.recentActivities || []);
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
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Pengurus</h1>
        <p className="text-slate-500 text-sm mt-1">Selamat datang kembali! Kelola konten dan aktivitas OSIS Anda di sini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = iconMap[index] || Newspaper;
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
                <span className={`flex items-center gap-1 font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-slate-600'}`}>
                  {stat.isPositive && <ArrowUpRight className="w-4 h-4" />}
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
            <h3 className="text-lg font-bold text-slate-800">Aktivitas Publikasi Konten</h3>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 h-64 mt-auto">
            {chartData.map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full bg-slate-100 rounded-t-sm relative flex items-end justify-center h-full">
                  <div 
                    className="w-full bg-blue-500 rounded-t-sm group-hover:bg-blue-600 transition-colors"
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

        <div className="space-y-6">
          {/* Tasks & To-Do */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Tugas & Agenda</h3>
            </div>
            
            {pendingTasks.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">Belum ada tugas</p>
            ) : (
              <div className="space-y-4">
                {pendingTasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`text-sm font-medium ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                        {task.task}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{task.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Aktivitas Saya</h3>
            </div>
            
            {activities.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">Belum ada aktivitas</p>
            ) : (
              <div className="space-y-5">
                {activities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative mt-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500 ring-4 ring-blue-50 z-10 relative"></div>
                      {index !== activities.length - 1 && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-px h-full bg-slate-200"></div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-slate-700">
                        Anda {activity.action} <span className="font-semibold text-blue-600">{activity.target}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
