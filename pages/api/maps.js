const { getPool } = require('../../lib/db');

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query(
        'SELECT id, title, location, latitude, longitude, created_at FROM maps ORDER BY created_at DESC'
      );

      return res.status(200).json({
        success: true,
        maps: rows
      });
    } catch (error) {
      console.error('Error fetching maps:', error);
      return res.status(500).json({ error: 'Failed to fetch maps' });
    }
  }

  if (req.method === 'POST') {
    const { title, location, latitude, longitude } = req.body || {};

    if (!title || !location || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'Missing required fields: title, location, latitude, longitude' });
    }

    // Validate latitude and longitude
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    if (lat < -90 || lat > 90) {
      return res.status(400).json({ error: 'Latitude must be between -90 and 90' });
    }

    if (lng < -180 || lng > 180) {
      return res.status(400).json({ error: 'Longitude must be between -180 and 180' });
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO maps (title, location, latitude, longitude) VALUES (?, ?, ?, ?)',
        [title.trim(), location.trim(), lat, lng]
      );

      return res.status(200).json({
        success: true,
        map: {
          id: result.insertId,
          title: title.trim(),
          location: location.trim(),
          latitude: lat,
          longitude: lng
        }
      });
    } catch (error) {
      console.error('Error creating map:', error);
      return res.status(500).json({ error: 'Failed to create map' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Missing map id' });
    }

    try {
      const [result] = await pool.query('DELETE FROM maps WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Map not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'Map deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting map:', error);
      return res.status(500).json({ error: 'Failed to delete map' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
