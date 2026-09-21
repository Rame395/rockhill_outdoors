import { getPool } from '../../../lib/db'

export default async function handler(req, res) {
  const pool = getPool()

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM hero_slides ORDER BY sort_order ASC, created_at DESC'
      )
      return res.status(200).json(rows)
    } catch (error) {
      console.error('Error fetching hero slides:', error)
      return res.status(500).json({ error: 'Failed to fetch hero slides' })
    }
  }

  if (req.method === 'POST') {
    try {
      const { media_type, media_url, title, subtitle, cta_text, cta_link, enabled, sort_order } = req.body
      
      const [result] = await pool.query(
        `INSERT INTO hero_slides (media_type, media_url, title, subtitle, cta_text, cta_link, enabled, sort_order) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [media_type, media_url, title || null, subtitle || null, cta_text || null, cta_link || null, enabled !== false, sort_order || 0]
      )
      
      const [newSlide] = await pool.query('SELECT * FROM hero_slides WHERE id = ?', [result.insertId])
      return res.status(201).json(newSlide[0])
    } catch (error) {
      console.error('Error creating hero slide:', error)
      return res.status(500).json({ error: 'Failed to create hero slide' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
