import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Activity } from 'lucide-react';

export const ActivityLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(100).then(({ data }) => setLogs(data || []));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Activity className="w-6 h-6 text-accent-purple"/> Activity Logs</h1>
      <div className="bg-surface-300 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-surface-200 text-slate-400">
            <tr><th className="px-6 py-4">Time</th><th className="px-6 py-4">User</th><th className="px-6 py-4">Action</th></tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} className="border-t border-slate-800">
                <td className="px-6 py-4 text-slate-500">{new Date(log.created_at).toLocaleString()}</td>
                <td className="px-6 py-4">{log.user_email || 'System'}</td>
                <td className="px-6 py-4 text-white font-medium capitalize">{log.action.replace(/_/g, ' ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
