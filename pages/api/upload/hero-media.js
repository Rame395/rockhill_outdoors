import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const uploadDir = path.join(process.cwd(), 'uploads', 'hero')
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024, // 50MB (allowing for videos)
    })

    const [fields, files] = await form.parse(req)
    const file = Array.isArray(files.file) ? files.file[0] : files.file

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const filePath = file.filepath || file.path
    if (!filePath) {
      return res.status(400).json({ error: 'File path not found' })
    }

    const fileName = path.basename(filePath)
    const originalFilename = file.originalFilename || fileName
    const fileStats = fs.statSync(filePath)
    const mimeType = file.mimetype || 'application/octet-stream'

    return res.status(200).json({
      success: true,
      filename: fileName,
      originalFilename: originalFilename,
      filePath: `/api/hero-media/${fileName}`,
      fileSize: fileStats.size,
      mimeType: mimeType,
    })
  } catch (error) {
    console.error('Error uploading hero media:', error)
    return res.status(500).json({ error: 'Failed to upload media' })
  }
}
