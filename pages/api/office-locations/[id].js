import { getPool } from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();
  const { id } = req.query;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM office_locations WHERE id = ?', [id]);
      if (!rows.length) return res.status(404).json({ error: 'Location not found' });
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch location' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { name, description, phone, sort_order, enabled } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });

      await pool.query(
        'UPDATE office_locations SET name = ?, description = ?, phone = ?, sort_order = ?, enabled = ? WHERE id = ?',
        [name, description || '', phone || '', sort_order ?? 0, enabled !== false, id]
      );
      const [rows] = await pool.query('SELECT * FROM office_locations WHERE id = ?', [id]);
      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error updating office location:', error);
      return res.status(500).json({ error: 'Failed to update location' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM office_locations WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting office location:', error);
      return res.status(500).json({ error: 'Failed to delete location' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
