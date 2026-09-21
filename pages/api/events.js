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
    .substring(0, 200) || `event-${Date.now()}`;
}

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'GET') {
    const { page, limit, offset } = parsePagination(req.query || {});
    try {
      const [rows] = await pool.query(
        `SELECT id, title, slug, excerpt, content, category, tags, featured_image AS featuredImage,
                author_name AS authorName, event_date AS eventDate, created_at AS createdAt
         FROM events
         ORDER BY COALESCE(event_date, created_at) DESC
         LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM events');
      const totalPages = Math.max(1, Math.ceil(total / limit));

      return res.status(200).json({
        events: rows,
        pagination: {
          page,
          limit,
          total,
          total_pages: totalPages
        }
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ error: 'Failed to fetch events' });
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
      eventDate
    } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const slug = slugify(title);

    try {
      const [result] = await pool.query(
        `INSERT INTO events
         (title, slug, excerpt, content, category, tags, featured_image, author_name, event_date)
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
          eventDate || null
        ]
      );

      return res.status(201).json({
        event: {
          id: result.insertId,
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
      console.error('Error creating event:', error);
      // Handle duplicate slug
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'An event with a similar title already exists' });
      }
      return res.status(500).json({ error: 'Failed to create event' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

