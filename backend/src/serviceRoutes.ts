import { Router } from 'express';
import { pool } from './db';

const router = Router();

// GET /api/incidents
router.get('/', async (req, res) => {
  try {
    const search = req.query.search as string || '';
    const query = search
      ? 'SELECT * FROM incidents WHERE title ILIKE $1 ORDER BY created_at DESC'
      : 'SELECT * FROM incidents ORDER BY created_at DESC';
    const params = search ? [`%${search}%`] : [];

    const result = await pool.query(query, params);
    return res.status(200).json(result.rows);
  } catch (err: any) {
    console.error('Fetch incidents error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/incidents
router.post('/', async (req, res) => {
  try {
    const { title, description, severity } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const result = await pool.query(
      'INSERT INTO incidents (title, description, severity, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, severity || 'LOW', 'OPEN']
    );

    return res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error('Create incident error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/incidents/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM incidents WHERE id = $1', [id]);
    return res.status(200).json({ message: 'Incident deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// PATCH /api/incidents/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE incidents SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return res.status(200).json(result.rows[0]);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;