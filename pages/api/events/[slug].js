const { getPool } = require('../../../lib/db');

export default async function handler(req, res) {
  const pool = getPool();
  const { slug } = req.query || {};

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query(
        `SELECT id, title, slug, excerpt, content, category, tags,
                featured_image AS featuredImage,
                author_name AS authorName,
                event_date AS eventDate,
                created_at AS createdAt
         FROM events
         WHERE slug = ?
         LIMIT 1`,
        [slug]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }

      return res.status(200).json({ event: rows[0] });
    } catch (error) {
      console.error('Error fetching event:', error);
      return res.status(500).json({ error: 'Failed to fetch event' });
    }
  }

  if (req.method === 'PUT') {
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      featuredImage,
      authorName,
      eventDate
    } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
      const [result] = await pool.query(
        `UPDATE events
         SET title = ?, excerpt = ?, content = ?, category = ?, tags = ?,
             featured_image = ?, author_name = ?, event_date = ?
         WHERE slug = ?`,
        [
          title.trim(),
          (excerpt || '').trim(),
          content,
          (category || '').trim(),
          (tags || '').trim(),
          (featuredImage || '').trim(),
          (authorName || '').trim(),
          eventDate || null,
          slug
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }

      return res.status(200).json({
        event: {
          title,
          slug,
          excerpt,
          content,
          category,
          tags,
          featuredImage,
          authorName,
          eventDate
        }
      });
    } catch (error) {
      console.error('Error updating event:', error);
      return res.status(500).json({ error: 'Failed to update event' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const [result] = await pool.query(
        'DELETE FROM events WHERE slug = ?',
        [slug]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).json({ error: 'Failed to delete event' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

