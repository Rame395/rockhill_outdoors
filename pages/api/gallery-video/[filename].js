const { getPool } = require('../../../lib/db');
const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  const pool = getPool();
  const { filename } = req.query || {};

  if (!filename || typeof filename !== 'string') {
    return res.status(400).json({ error: 'Invalid filename' });
  }

  try {
    // Verify the video exists in database
    const [rows] = await pool.query(
      'SELECT filename FROM gallery_images WHERE filename = ? AND media_type = "video"',
      [filename]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const videoPath = path.join(process.cwd(), 'uploads', 'gallery', filename);

    // Check if file exists
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ error: 'Video file not found' });
    }

    // Get file stats
    const stats = fs.statSync(videoPath);
    
    // Set appropriate headers for video streaming
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Accept-Ranges', 'bytes');
    
    // Handle range requests for video streaming
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      
      res.setHeader('Content-Range', `bytes ${start}-${end}/${stats.size}`);
      res.setHeader('Content-Length', chunksize);
      res.status(206);

      const videoStream = fs.createReadStream(videoPath, { start, end });
      videoStream.pipe(res);
    } else {
      res.status(200);
      const videoStream = fs.createReadStream(videoPath);
      videoStream.pipe(res);
    }
  } catch (error) {
    console.error('Error serving video:', error);
    return res.status(500).json({ error: 'Failed to serve video' });
  }
}
