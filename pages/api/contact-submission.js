const { getPool } = require('../../lib/db');

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
        `SELECT id, name, email, phone, subject, message, status, submitted_at AS submittedAt
         FROM contact_submissions
         ORDER BY submitted_at DESC
         LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM contact_submissions');
      const totalPages = Math.max(1, Math.ceil(total / limit));

      return res.status(200).json({
        submissions: rows,
        pagination: {
          page,
          limit,
          total,
          total_pages: totalPages
        }
      });
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      return res.status(500).json({ error: 'Failed to fetch contact submissions' });
    }
  }

  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    try {
      const [result] = await pool.query(
        `INSERT INTO contact_submissions (name, email, phone, subject, message)
         VALUES (?, ?, ?, ?, ?)`,
        [
          name.trim(),
          email.trim(),
          (phone || '').trim() || null,
          (subject || '').trim() || null,
          message.trim()
        ]
      );

      return res.status(201).json({
        success: true,
        submission: {
          id: result.insertId,
          name,
          email,
          phone,
          subject,
          message
        }
      });
    } catch (error) {
      console.error('Error creating contact submission:', error);
      return res.status(500).json({ error: 'Failed to submit contact form' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
