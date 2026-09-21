const { getPool } = require('../../../lib/db')
const fs = require('fs')
const path = require('path')

export default async function handler(req, res) {
  const pool = getPool()
  const { id } = req.query

  if (req.method === 'DELETE') {
    try {
      // Get image info before deleting
      const [rows] = await pool.query('SELECT * FROM gallery_images WHERE id = ?', [id])

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Image not found' })
      }

      const image = rows[0]

      // Delete from database
      await pool.query('DELETE FROM gallery_images WHERE id = ?', [id])

      // Delete file from filesystem
      const filePath = path.join(process.cwd(), image.file_path)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }

      return res.status(200).json({
        success: true,
        message: 'Image deleted successfully',
      })
    } catch (error) {
      console.error('Error deleting gallery image:', error)
      return res.status(500).json({ error: 'Failed to delete image' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
