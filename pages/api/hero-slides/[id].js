import { getPool } from '../../../lib/db'

export default async function handler(req, res) {
  const { id } = req.query
  const pool = getPool()

  if (req.method === 'PUT') {
    try {
      const { media_type, media_url, title, subtitle, cta_text, cta_link, enabled, sort_order } = req.body
      
      await pool.query(
        `UPDATE hero_slides 
         SET media_type = ?, media_url = ?, title = ?, subtitle = ?, cta_text = ?, cta_link = ?, enabled = ?, sort_order = ?
         WHERE id = ?`,
        [media_type, media_url, title || null, subtitle || null, cta_text || null, cta_link || null, enabled !== false, sort_order || 0, id]
      )
      
      const [updatedSlide] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [id])
      
      if (updatedSlide.length === 0) {
        return res.status(404).json({ error: 'Slide not found' })
      }
      
      return res.status(200).json(updatedSlide[0])
    } catch (error) {
      console.error('Error updating hero slide:', error)
      return res.status(500).json({ error: 'Failed to update hero slide' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const [result] = await pool.query('DELETE FROM hero_slides WHERE id = ?', [id])
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Slide not found' })
      }
      
      return res.status(200).json({ success: true, message: 'Slide deleted successfully' })
    } catch (error) {
      console.error('Error deleting hero slide:', error)
      return res.status(500).json({ error: 'Failed to delete hero slide' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
