import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const { filename } = req.query

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Images are stored in root/uploads/gallery
    const filePath = path.join(process.cwd(), 'uploads', 'gallery', filename)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Image not found' })
    }

    // Read file
    const fileBuffer = fs.readFileSync(filePath)
    
    // Determine content type
    const ext = path.extname(filename).toLowerCase()
    const contentTypeMap = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    }
    const contentType = contentTypeMap[ext] || 'image/jpeg'

    // Set headers and send file
    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    return res.status(200).send(fileBuffer)
  } catch (error) {
    console.error('Error serving gallery image:', error)
    return res.status(500).json({ error: 'Failed to serve image' })
  }
}
