const { getPool } = require('../../lib/db');

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query(
        'SELECT enabled, text FROM announcements ORDER BY updated_at DESC LIMIT 1'
      );

      if (rows.length === 0) {
        return res.status(200).json({ enabled: false, text: '' });
      }

      return res.status(200).json({
        enabled: Boolean(rows[0].enabled),
        text: rows[0].text || ''
      });
    } catch (error) {
      console.error('Error fetching announcement:', error);
      return res.status(500).json({ error: 'Failed to fetch announcement' });
    }
  }

  if (req.method === 'POST') {
    const { enabled, text } = req.body || {};

    if (typeof enabled !== 'boolean' || typeof text !== 'string') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    try {
      // Check if announcement exists
      const [existing] = await pool.query('SELECT id FROM announcements ORDER BY updated_at DESC LIMIT 1');

      if (existing.length > 0) {
        // Update existing announcement
        await pool.query(
          'UPDATE announcements SET enabled = ?, text = ? WHERE id = ?',
          [enabled, text.trim(), existing[0].id]
        );
      } else {
        // Insert new announcement
        await pool.query(
          'INSERT INTO announcements (enabled, text) VALUES (?, ?)',
          [enabled, text.trim()]
        );
      }

      return res.status(200).json({
        success: true,
        announcement: { enabled, text: text.trim() }
      });
    } catch (error) {
      console.error('Error saving announcement:', error);
      return res.status(500).json({ error: 'Failed to save announcement' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

