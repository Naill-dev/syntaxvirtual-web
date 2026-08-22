import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';
import { Users, Shield } from 'lucide-react';

export const RoleManager = () => {
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('user_roles').select('*').then(({ data }) => setRoles(data || []));
  }, []);

  const updateRole = async (id: string, newRole: string) => {
    const { error } = await supabase.from('user_roles').update({ role: newRole }).eq('user_id', id);
    if (!error) {
      setRoles(roles.map(r => r.user_id === id ? { ...r, role: newRole } : r));
      toast.success('Role updated');
    } else {
      toast.error('Failed to update role');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Shield className="w-6 h-6 text-accent-purple"/> Role Management</h1>
      <div className="bg-surface-300 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-surface-200 text-slate-400">
            <tr><th className="px-6 py-4">User ID</th><th className="px-6 py-4">Current Role</th><th className="px-6 py-4 text-right">Change Role</th></tr>
          </thead>
          <tbody>
            {roles.map(r => (
              <tr key={r.user_id} className="border-t border-slate-800">
                <td className="px-6 py-4 font-mono text-xs">{r.user_id}</td>
                <td className="px-6 py-4 capitalize font-medium text-white">{r.role.replace('_', ' ')}</td>
                <td className="px-6 py-4 text-right">
                  <select 
                    value={r.role} 
                    onChange={(e) => updateRole(r.user_id, e.target.value)}
                    className="bg-surface-200 border border-slate-700 text-white text-sm rounded-lg px-3 py-1.5 focus:ring-accent-purple outline-none"
                  >
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
