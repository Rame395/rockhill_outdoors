import { getPool } from '../../../lib/db';

export default async function handler(req, res) {
  const pool = getPool();
  const { id } = req.query;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    try {
      const { slug, name, description, icon_name, sort_order, enabled } = req.body;
      if (!name || !slug) return res.status(400).json({ error: 'Name and slug are required' });

      await pool.query(
        'UPDATE learning_categories SET slug = ?, name = ?, description = ?, icon_name = ?, sort_order = ?, enabled = ? WHERE id = ?',
        [slug, name, description || '', icon_name || 'HelpCircle', sort_order ?? 0, enabled !== false, id]
      );
      const [rows] = await pool.query('SELECT * FROM learning_categories WHERE id = ?', [id]);
      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error('Error updating learning category:', error);
      return res.status(500).json({ error: 'Failed to update category (slug must be unique)' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM learning_categories WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting learning category:', error);
      return res.status(500).json({ error: 'Failed to delete category' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
