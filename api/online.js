import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID required' });
  }

  try {
    // 1. Ensure the tracking table exists
    await sql`
      CREATE TABLE IF NOT EXISTS site_analytics (
        user_id TEXT PRIMARY KEY,
        last_seen TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Register/Update this user's heartbeat
    await sql`
      INSERT INTO site_analytics (user_id, last_seen)
      VALUES (${userId}, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id) 
      DO UPDATE SET last_seen = CURRENT_TIMESTAMP;
    `;

    // 3. Get TOTAL unique visits (ever)
    const totalResult = await sql`SELECT COUNT(*) as count FROM site_analytics`;
    const totalVisits = parseInt(totalResult.rows[0].count);

    // 4. Get ONLINE users (active in the last 60 seconds)
    const onlineResult = await sql`
      SELECT COUNT(*) as count 
      FROM site_analytics 
      WHERE last_seen > (CURRENT_TIMESTAMP - INTERVAL '60 seconds');
    `;
    const onlineCount = parseInt(onlineResult.rows[0].count);

    res.status(200).json({ 
      online: onlineCount,
      totalVisits: totalVisits
    });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
