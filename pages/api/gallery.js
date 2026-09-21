const { getPool } = require('../../lib/db')

export default async function handler(req, res) {
  const pool = getPool()

  if (req.method === 'GET') {
    try {
      // Ensure table exists with video support
      await pool.query(`
        CREATE TABLE IF NOT EXISTS gallery_images (
          id INT AUTO_INCREMENT PRIMARY KEY,
          filename VARCHAR(255) NOT NULL,
          original_filename VARCHAR(255) NOT NULL,
          file_path VARCHAR(512) NOT NULL,
          file_size INT,
          mime_type VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `)

      // Add media_type column if it doesn't exist (for existing installations)
      await pool.query(`
        ALTER TABLE gallery_images 
        ADD COLUMN media_type ENUM('image', 'video') DEFAULT 'image'
      `).catch(() => {}) // Ignore error if column already exists

      const [rows] = await pool.query(
        'SELECT * FROM gallery_images ORDER BY created_at DESC'
      )

      return res.status(200).json({
        success: true,
        images: rows,
      })
    } catch (error) {
      console.error('Error fetching gallery images:', error)
      return res.status(500).json({ error: 'Failed to fetch gallery images' })
    }
  }

  if (req.method === 'POST') {
    try {
      // Ensure table exists with video support
      await pool.query(`
        CREATE TABLE IF NOT EXISTS gallery_images (
          id INT AUTO_INCREMENT PRIMARY KEY,
          filename VARCHAR(255) NOT NULL,
          original_filename VARCHAR(255) NOT NULL,
          file_path VARCHAR(512) NOT NULL,
          file_size INT,
          mime_type VARCHAR(100),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `)

      // Add media_type column if it doesn't exist (for existing installations)
      await pool.query(`
        ALTER TABLE gallery_images 
        ADD COLUMN media_type ENUM('image', 'video') DEFAULT 'image'
      `).catch(() => {}) // Ignore error if column already exists

      const { filename, originalFilename, filePath, fileSize, mimeType, mediaType } = req.body

      if (!filename || !filePath) {
        return res.status(400).json({ error: 'Filename and file path are required' })
      }

      const [result] = await pool.query(
        `INSERT INTO gallery_images (filename, original_filename, file_path, file_size, mime_type, media_type)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [filename, originalFilename || filename, filePath, fileSize || 0, mimeType || 'image/jpeg', mediaType || 'image']
      )

      return res.status(201).json({
        success: true,
        image: {
          id: result.insertId,
          filename,
          originalFilename,
          filePath,
          fileSize,
          mimeType,
          mediaType: mediaType || 'image',
        },
      })
    } catch (error) {
      console.error('Error saving gallery image:', error)
      return res.status(500).json({ error: 'Failed to save gallery image' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
