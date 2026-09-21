const { getPool } = require('../../lib/db');

function parsePagination(query) {
  const page = Math.max(1, parseInt(query.page || '1', 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '20', 10) || 20));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'POST') {
    const { eventId, name, email, phone, message } = req.body || {};

    if (!eventId || !name || !email || !phone) {
      return res.status(400).json({ error: 'eventId, name, email, and phone are required' });
    }

    try {
      await pool.query(
        `INSERT INTO event_enquiries (event_id, name, email, phone, message)
         VALUES (?, ?, ?, ?, ?)`,
        [eventId, name.trim(), email.trim(), phone.trim(), (message || '').trim()]
      );

      return res.status(201).json({ success: true });
    } catch (error) {
      console.error('Error creating event enquiry:', error);
      return res.status(500).json({ error: 'Failed to create event enquiry' });
    }
  }

  if (req.method === 'GET') {
    const { page, limit, offset } = parsePagination(req.query || {});

    try {
      const [rows] = await pool.query(
        `SELECT ee.id,
                ee.name,
                ee.email,
                ee.phone,
                ee.message,
                ee.created_at AS createdAt,
                e.title AS eventTitle,
                e.slug AS eventSlug
         FROM event_enquiries ee
         JOIN events e ON ee.event_id = e.id
         ORDER BY ee.created_at DESC
         LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      const [[{ total }]] = await pool.query(
        'SELECT COUNT(*) AS total FROM event_enquiries'
      );
      const totalPages = Math.max(1, Math.ceil(total / limit));

      return res.status(200).json({
        enquiries: rows,
        pagination: {
          page,
          limit,
          total,
          total_pages: totalPages
        }
      });
    } catch (error) {
      console.error('Error fetching event enquiries:', error);
      return res.status(500).json({ error: 'Failed to fetch event enquiries' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

