import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID required' });
  }

  try {
    // 1. Register/Update this user's heartbeat
    // Note: Ensure you have a table 'site_analytics' with 'user_id' as PRIMARY KEY
    const { error: upsertError } = await supabase
      .from('site_analytics')
      .upsert(
        { user_id: userId, last_seen: new Date().toISOString() },
        { onConflict: 'user_id' }
      );

    if (upsertError) throw upsertError;

    // 2. Get TOTAL unique visits (ever)
    const { count: totalVisits, error: totalError } = await supabase
      .from('site_analytics')
      .select('*', { count: 'exact', head: true });

    if (totalError) throw totalError;

    // 3. Get ONLINE users (active in the last 60 seconds)
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
    const { count: onlineCount, error: onlineError } = await supabase
      .from('site_analytics')
      .select('*', { count: 'exact', head: true })
      .gt('last_seen', oneMinuteAgo);

    if (onlineError) throw onlineError;

    res.status(200).json({ 
      online: onlineCount || 1,
      totalVisits: totalVisits || 0
    });
  } catch (error) {
    console.error('Supabase Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
