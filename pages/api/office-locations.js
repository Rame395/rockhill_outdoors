import { getPool } from '../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM office_locations WHERE enabled = true ORDER BY sort_order ASC, id ASC'
      );
      return res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching office locations:', error);
      return res.status(500).json({ error: 'Failed to fetch locations' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, description, phone, sort_order, enabled } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });

      const [result] = await pool.query(
        'INSERT INTO office_locations (name, description, phone, sort_order, enabled) VALUES (?, ?, ?, ?, ?)',
        [name, description || '', phone || '', sort_order || 0, enabled !== false]
      );
      const [rows] = await pool.query('SELECT * FROM office_locations WHERE id = ?', [result.insertId]);
      return res.status(201).json(rows[0]);
    } catch (error) {
      console.error('Error creating office location:', error);
      return res.status(500).json({ error: 'Failed to create location' });
    }
  }

  // Admin: GET ALL (including disabled)
  return res.status(405).json({ error: 'Method not allowed' });
}
