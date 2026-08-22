import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const { data } = await supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(5);
    if (data) setNotifications(data);
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const markAsRead = async (id: string) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    fetchNotifications();
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 relative text-slate-300 hover:text-white transition-colors">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0f172a]"></span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-surface-300 border border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-slate-700 font-semibold text-white">Notifications</div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-slate-400 text-sm text-center">No notifications</div>
            ) : (
              notifications.map(n => (
                <div key={n.id} onClick={() => markAsRead(n.id)} className={`p-4 border-b border-slate-800/50 cursor-pointer hover:bg-surface-200 transition-colors ${!n.is_read ? 'bg-surface-200/50' : ''}`}>
                  <p className="text-sm text-slate-200">{n.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{new Date(n.created_at).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
