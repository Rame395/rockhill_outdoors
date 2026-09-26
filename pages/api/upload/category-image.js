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
    const uploadDir = path.join(process.cwd(), 'uploads', 'categories')
    
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
    const publicPath = `/api/category-image/${fileName}`

    return res.status(200).json({
      image_path: publicPath,
      path: publicPath,
    })
  } catch (error) {
    console.error('Error uploading category image:', error)
    return res.status(500).json({ error: 'Failed to upload image' })
  }
}
