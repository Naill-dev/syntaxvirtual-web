import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();

    const channel = supabase.channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          setNotifications(prev => [payload.new, ...prev].slice(0, 5));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { data } = await supabase.from('notifications')
      .select('*')
      .eq('user_id', userData.user.id)
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setNotifications(data);
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleNotificationClick = async (n: any) => {
    setIsOpen(false);
    if (!n.is_read) {
      await supabase.from('notifications').update({ is_read: true }).eq('id', n.id);
      setNotifications(notifications.map(notif => notif.id === n.id ? { ...notif, is_read: true } : notif));
    }
    if (n.link) {
      navigate(n.link);
    }
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
                <div key={n.id} onClick={() => handleNotificationClick(n)} className={`p-4 border-b border-slate-800/50 cursor-pointer hover:bg-surface-200 transition-colors ${!n.is_read ? 'bg-surface-200/50' : ''}`}>
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
