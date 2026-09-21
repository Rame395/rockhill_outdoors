import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({
    multiples: false,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024 // 5MB
  });

  return new Promise((resolve) => {
    form.parse(req, (err, _fields, files) => {
      if (err) {
        console.error('Error parsing upload:', err);
        // If file exceeds size limit, return specific error message
        const isTooLarge =
          err.code === 'LIMIT_FILE_SIZE' ||
          /maxFileSize|file size|exceeded/i.test(err.message || '');
        if (isTooLarge) {
          res.status(400).json({ error: 'Image file shouuld be less than 5 mb' });
          return resolve();
        }
        res.status(500).json({ error: 'Failed to upload image' });
        return resolve();
      }

      const firstKey = Object.keys(files)[0];
      const rawFile = firstKey ? files[firstKey] : null;
      const file = Array.isArray(rawFile) ? rawFile[0] : rawFile;

      if (!file) {
        res.status(400).json({ error: 'No file uploaded' });
        return resolve();
      }

      const uploadDir = path.join(process.cwd(), 'uploads', 'events');

      try {
        fs.mkdirSync(uploadDir, { recursive: true });
      } catch (e) {
        console.error('Error creating upload directory:', e);
      }

      const originalName = file.originalFilename || file.newFilename || 'event-image';
      const ext = path.extname(originalName) || '.jpg';
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const filePath = path.join(uploadDir, fileName);
      const tempPath = file.filepath || file.path;

      if (!tempPath) {
        console.error('Uploaded file missing temp path:', file);
        res.status(500).json({ error: 'Invalid uploaded file data' });
        return resolve();
      }

      fs.copyFile(tempPath, filePath, (copyErr) => {
        if (copyErr) {
          console.error('Error saving uploaded file:', copyErr);
          res.status(500).json({ error: 'Failed to save image' });
          return resolve();
        }

        const publicPath = `/api/event-image/${fileName}`;
        res.status(200).json({ image_path: publicPath, path: publicPath });
        return resolve();
      });
    });
  });
}

