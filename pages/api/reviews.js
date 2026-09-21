const { getPool } = require('../../lib/db');

function parsePagination(query) {
  const page = Math.max(1, parseInt(query.page || '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit || '10', 10) || 10));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'GET') {
    const { page, limit, offset } = parsePagination(req.query || {});
    try {
      const [rows] = await pool.query(
        `SELECT id, user_name AS userName, user_email AS userEmail, rating, title, content, 
                status, created_at AS createdAt
         FROM reviews
         WHERE status = 'approved'
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const [[{ total }]] = await pool.query(
        "SELECT COUNT(*) AS total FROM reviews WHERE status = 'approved'"
      );
      const totalPages = Math.max(1, Math.ceil(total / limit));

      return res.status(200).json({
        reviews: rows,
        pagination: {
          page,
          limit,
          total,
          total_pages: totalPages
        }
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  }

  if (req.method === 'POST') {
    const { name, email, rating, title, content } = req.body || {};

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    if (!rating || !content) {
      return res.status(400).json({ error: 'Rating and content are required' });
    }

    const ratingNum = parseInt(rating, 10);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
      const [result] = await pool.query(
        `INSERT INTO reviews (user_id, user_name, user_email, rating, title, content, status)
         VALUES (NULL, ?, ?, ?, ?, ?, 'pending')`,
        [
          name.trim(),
          email.trim(),
          ratingNum,
          (title || '').trim(),
          content.trim()
        ]
      );

      return res.status(201).json({
        success: true,
        review: {
          id: result.insertId,
          rating: ratingNum,
          title,
          content
        }
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      return res.status(500).json({ error: 'Failed to submit review' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
