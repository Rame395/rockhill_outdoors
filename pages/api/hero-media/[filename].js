import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { filename } = req.query
  const filePath = path.join(process.cwd(), 'uploads', 'hero', filename)

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' })
  }

  const stat = fs.statSync(filePath)
  const ext = path.extname(filename).toLowerCase()
  
  let contentType = 'application/octet-stream'
  if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
  else if (ext === '.png') contentType = 'image/png'
  else if (ext === '.gif') contentType = 'image/gif'
  else if (ext === '.webp') contentType = 'image/webp'
  else if (ext === '.mp4') contentType = 'video/mp4'
  else if (ext === '.webm') contentType = 'video/webm'

  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Cache-Control': 'public, max-age=31536000, immutable'
  })

  const readStream = fs.createReadStream(filePath)
  readStream.pipe(res)
}
