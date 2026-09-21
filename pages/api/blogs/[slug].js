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
                published_date AS publishedDate,
                created_at AS createdAt
         FROM blogs
         WHERE slug = ?
         LIMIT 1`,
        [slug]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      return res.status(200).json({ blog: rows[0] });
    } catch (error) {
      console.error('Error fetching blog:', error);
      return res.status(500).json({ error: 'Failed to fetch blog' });
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
      publishedDate
    } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
      const [result] = await pool.query(
        `UPDATE blogs
         SET title = ?, excerpt = ?, content = ?, category = ?, tags = ?,
             featured_image = ?, author_name = ?, published_date = ?
         WHERE slug = ?`,
        [
          title.trim(),
          (excerpt || '').trim(),
          content,
          (category || '').trim(),
          (tags || '').trim(),
          (featuredImage || '').trim(),
          (authorName || '').trim(),
          publishedDate || null,
          slug
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      return res.status(200).json({
        blog: {
          title,
          slug,
          excerpt,
          content,
          category,
          tags,
          featuredImage,
          authorName,
          publishedDate
        }
      });
    } catch (error) {
      console.error('Error updating blog:', error);
      return res.status(500).json({ error: 'Failed to update blog' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const [result] = await pool.query(
        'DELETE FROM blogs WHERE slug = ?',
        [slug]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting blog:', error);
      return res.status(500).json({ error: 'Failed to delete blog' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
