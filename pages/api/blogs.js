const { getPool } = require('../../lib/db');

function parsePagination(query) {
  const page = Math.max(1, parseInt(query.page || '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit || '10', 10) || 10));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

function slugify(text) {
  return (text || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 200) || `blog-${Date.now()}`;
}

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'GET') {
    const { page, limit, offset } = parsePagination(req.query || {});
    try {
      const [rows] = await pool.query(
        `SELECT id, title, slug, excerpt, category, tags, featured_image AS featuredImage,
                author_name AS authorName, published_date AS publishedDate, created_at AS createdAt
         FROM blogs
         ORDER BY COALESCE(published_date, created_at) DESC
         LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM blogs');
      const totalPages = Math.max(1, Math.ceil(total / limit));

      return res.status(200).json({
        blogs: rows,
        pagination: {
          page,
          limit,
          total,
          total_pages: totalPages
        }
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  }

  if (req.method === 'POST') {
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

    const slug = slugify(title);

    try {
      const [result] = await pool.query(
        `INSERT INTO blogs
         (title, slug, excerpt, content, category, tags, featured_image, author_name, published_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title.trim(),
          slug,
          (excerpt || '').trim(),
          content,
          (category || '').trim(),
          (tags || '').trim(),
          (featuredImage || '').trim(),
          (authorName || '').trim(),
          publishedDate || null
        ]
      );

      return res.status(201).json({
        blog: {
          id: result.insertId,
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
      console.error('Error creating blog:', error);
      // Handle duplicate slug
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'A blog with a similar title already exists' });
      }
      return res.status(500).json({ error: 'Failed to create blog' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
