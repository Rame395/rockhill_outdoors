import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    responseLimit: false,
  },
}

export default function handler(req, res) {
  const { filename } = req.query

  try {
    const filePath = path.join(process.cwd(), 'uploads', 'categories', filename)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Image not found' })
    }

    const stat = fs.statSync(filePath)
    const ext = path.extname(filename).toLowerCase()
    const contentTypeMap = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    }
    const mimeType = contentTypeMap[ext] || 'image/jpeg'

    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': stat.size,
      'Cache-Control': 'public, max-age=31536000, immutable',
    })

    const readStream = fs.createReadStream(filePath)
    readStream.pipe(res)
  } catch (error) {
    console.error('Error serving category image:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
