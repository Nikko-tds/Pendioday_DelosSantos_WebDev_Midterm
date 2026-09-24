import { Router } from 'express';
import { pool } from './db';

const router = Router();

// GET /api/services
router.get('/', async (req, res) => {
  try {
    const search = req.query.search as string || '';
    const query = search
      ? 'SELECT * FROM services WHERE title ILIKE $1 ORDER BY created_at DESC'
      : 'SELECT * FROM services ORDER BY created_at DESC';
    const params = search ? [`%${search}%`] : [];

    const result = await pool.query(query, params);
    return res.status(200).json(result.rows);
  } catch (err: any) {
    console.error('Fetch services error:', err);
    return res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, endpointUrl, environment, status, version, ownerEmail, createdAt } = req.body;

    if (!name || !endpointUrl) {
      return res.status(400).json({ error: 'Name and endpoint are required' });
    }

    const result = await pool.query(
      'INSERT INTO SERVICES (name, endpointUrl, environment, status, version, ownerEmail, createdAt) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, endpointUrl, environment, status, version, ownerEmail, createdAt || 'DEVELOPMENT', 'HEALTHY']
    );

    return res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error('Create service error:', err);
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/services/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM services WHERE id = $1', [id]);
    return res.status(200).json({ message: 'service deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// PATCH /api/services/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { environment, status } = req.body;
    const result = await pool.query(
      'UPDATE services SET environment = $1, status = $2 WHERE id = $3 RETURNING *',
      [environment, status, id]
    );
    return res.status(200).json(result.rows[0]);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;