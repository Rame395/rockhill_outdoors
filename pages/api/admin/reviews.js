const { getPool } = require('../../../lib/db');

function parsePagination(query) {
  const page = Math.max(1, parseInt(query.page || '1', 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '50', 10) || 50));
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
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM reviews');
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

  return res.status(405).json({ error: 'Method not allowed' });
}
