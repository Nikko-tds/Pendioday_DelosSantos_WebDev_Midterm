import express from 'express';
import authRoutes from './authRoutes';
import serviceRoutes from './serviceRoutes';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});