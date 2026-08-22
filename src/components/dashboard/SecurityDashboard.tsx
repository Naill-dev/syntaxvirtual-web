import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, Lock, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export const SecurityDashboard = () => {
  const [stats, setStats] = useState({ admins: 0, failedLogins: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const { count: adminCount } = await supabase.from('user_roles').select('*', { count: 'exact', head: true }).in('role', ['admin', 'super_admin']);
      const { count: failedCount } = await supabase.from('activity_logs').select('*', { count: 'exact', head: true }).eq('action', 'login_failed');
      setStats({ admins: adminCount || 0, failedLogins: failedCount || 0 });
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2"><ShieldAlert className="w-6 h-6 text-red-500"/> Security Center</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-300 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500"><Users className="w-6 h-6"/></div>
          <div><p className="text-sm text-slate-400">Total Admins</p><p className="text-2xl font-bold text-white">{stats.admins}</p></div>
        </div>
        <div className="bg-surface-300 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-500/10 text-red-500"><AlertTriangle className="w-6 h-6"/></div>
          <div><p className="text-sm text-slate-400">Failed Logins</p><p className="text-2xl font-bold text-white">{stats.failedLogins}</p></div>
        </div>
        <div className="bg-surface-300 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-green-500/10 text-green-500"><Lock className="w-6 h-6"/></div>
          <div><p className="text-sm text-slate-400">System Status</p><p className="text-2xl font-bold text-green-400">Secure</p></div>
        </div>
      </div>
    </div>
  );
};
