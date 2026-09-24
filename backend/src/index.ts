import express from 'express';
import authRoutes from './authRoutes';
import serviceRoutes from './serviceRoutes'; // Adjust relative path if needed

const app = express();
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes); // MUST BE /api/incidents

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});