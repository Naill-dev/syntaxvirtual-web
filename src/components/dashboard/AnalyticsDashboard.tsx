import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Briefcase, Star, MessageSquare } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({ visitors: 0, projects: 0, reviews: 0, inquiries: 0 });
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [v, p, r, i] = await Promise.all([
        supabase.from('page_views').select('*', { count: 'exact', head: true }),
        supabase.from('portfolio').select('*', { count: 'exact', head: true }),
        supabase.from('reviews').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true })
      ]);
      setStats({
        visitors: v.count || 0, projects: p.count || 0, reviews: r.count || 0, inquiries: i.count || 0
      });
      // Mock chart data for last 7 days
      const mockData = Array.from({length: 7}).map((_, idx) => ({
        name: `Day ${idx+1}`, visitors: Math.floor(Math.random() * 100), inquiries: Math.floor(Math.random() * 10)
      }));
      setChartData(mockData);
    };
    fetchData();
  }, []);

  const Card = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-surface-300 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Analytics Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Visitors" value={stats.visitors} icon={Users} color="bg-blue-500" />
        <Card title="Total Projects" value={stats.projects} icon={Briefcase} color="bg-purple-500" />
        <Card title="Total Reviews" value={stats.reviews} icon={Star} color="bg-yellow-500" />
        <Card title="Inquiries" value={stats.inquiries} icon={MessageSquare} color="bg-green-500" />
      </div>
      <div className="bg-surface-300 p-6 rounded-2xl border border-slate-800 h-96">
        <h2 className="text-lg font-semibold text-white mb-6">Traffic & Engagement (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
            <Line type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={3} />
            <Line type="monotone" dataKey="inquiries" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
