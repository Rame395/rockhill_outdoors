import { getPool } from '../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT setting_key, setting_value FROM site_settings');
      // Convert array to key-value object
      const settings = {};
      rows.forEach(row => {
        settings[row.setting_key] = row.setting_value;
      });
      return res.status(200).json(settings);
    } catch (error) {
      console.error('Error fetching site settings:', error);
      return res.status(500).json({ error: 'Failed to fetch settings' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const updates = req.body; // { contact_email: '...', contact_phone: '...' }
      for (const [key, value] of Object.entries(updates)) {
        await pool.query(
          'INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?',
          [key, value, value]
        );
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating site settings:', error);
      return res.status(500).json({ error: 'Failed to update settings' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
