const { getPool } = require('../../lib/db');

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === 'POST') {
    const { name, phone, email, message } = req.body;

    // Validation
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
      // Insert submission into database
      const [result] = await pool.query(
        'INSERT INTO form_submissions (type, name, phone, email, message, status) VALUES (?, ?, ?, ?, ?, ?)',
        ['learning', name.trim(), phone.trim(), email.trim(), message.trim(), 'new']
      );

      console.log('Learning submission received:', { id: result.insertId, type: 'learning' });

      return res.status(200).json({
        success: true,
        message: 'Thank you for your inquiry. We will contact you soon.',
        submissionId: result.insertId
      });
    } catch (error) {
      console.error('Error saving learning submission:', error);
      return res.status(500).json({ error: 'Failed to save submission' });
    }
  } else if (req.method === 'GET') {
    // Admin endpoint to view submissions
    try {
      const [rows] = await pool.query(
        'SELECT * FROM form_submissions WHERE type = ? ORDER BY submitted_at DESC',
        ['learning']
      );

      return res.status(200).json({
        total: rows.length,
        submissions: rows.map(row => ({
          id: row.id,
          type: row.type,
          name: row.name,
          phone: row.phone,
          email: row.email,
          message: row.message,
          status: row.status,
          submittedAt: row.submitted_at.toISOString()
        }))
      });
    } catch (error) {
      console.error('Error fetching learning submissions:', error);
      return res.status(500).json({ error: 'Failed to fetch submissions' });
    }
  } else if (req.method === 'DELETE') {
    // Admin endpoint to delete submission
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: 'Submission ID is required' });
    }

    try {
      await pool.query('DELETE FROM form_submissions WHERE id = ? AND type = ?', [id, 'learning']);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting learning submission:', error);
      return res.status(500).json({ error: 'Failed to delete submission' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
