import { supabase } from './supabaseClient';

export const logAuditAction = async (userEmail: string, action: string, details?: any) => {
  try {
    const { error } = await supabase.from('audit_log').insert([
      {
        user_email: userEmail,
        action,
        details: details || {}
      }
    ]);
    if (error) console.error('Failed to log audit action:', error);
  } catch (err) {
    console.error('Failed to log audit action:', err);
  }
};
