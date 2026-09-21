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
    // Store in root/uploads/gallery (NOT in public folder)
    const uploadDir = path.join(process.cwd(), 'uploads', 'gallery')
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
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
    
    // Store relative path for database
    const relativePath = `uploads/gallery/${fileName}`

    // Get MIME type
    const mimeType = file.mimetype || 'image/jpeg'

    return res.status(200).json({
      success: true,
      filename: fileName,
      originalFilename: originalFilename,
      filePath: `/api/gallery-image/${fileName}`,
      fileSize: fileStats.size,
      mimeType: mimeType,
    })
  } catch (error) {
    console.error('Error uploading gallery image:', error)
    return res.status(500).json({ error: 'Failed to upload image' })
  }
}
