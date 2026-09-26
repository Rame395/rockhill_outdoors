import { getPool } from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM learning_categories WHERE enabled = true ORDER BY sort_order ASC, id ASC'
      );
      return res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching learning categories:', error);
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { slug, name, description, icon_name, sort_order, enabled, image_url } = req.body;
      if (!name || !slug) return res.status(400).json({ error: 'Name and slug are required' });

      const [result] = await pool.query(
        'INSERT INTO learning_categories (slug, name, description, icon_name, sort_order, enabled, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [slug, name, description || '', icon_name || 'HelpCircle', sort_order || 0, enabled !== false, image_url || null]
      );
      const [rows] = await pool.query('SELECT * FROM learning_categories WHERE id = ?', [result.insertId]);
      return res.status(201).json(rows[0]);
    } catch (error) {
      console.error('Error creating learning category:', error);
      return res.status(500).json({ error: 'Failed to create category (slug must be unique)' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
