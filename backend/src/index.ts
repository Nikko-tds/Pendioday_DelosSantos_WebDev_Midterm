import express from 'express';
import authRoutes from './authRoutes';
import -Routes from '.-Routes'; // Adjust relative path if needed

const app = express();
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes); // MUST BE /api/incidents

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});