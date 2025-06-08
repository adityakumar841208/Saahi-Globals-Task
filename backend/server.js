const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./dbConnection')
const categoryRoutes = require('./Routes/categoryRoutes')
const productRoutes = require('./Routes/productRoutes')
const subcategoryRoutes = require('./Routes/subcategoryRoutes')
require('dotenv').config();

const port = 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(express.json());

// Connect to the database
connectDB()


// Simple login endpoint for verification
app.post('/', (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', { email, password });
  if (email === 'admin@admin.com' && password === 'admin123'){
    return res.json({ isVerified: true });
  }
  return res.status(401).json({ isVerified: false, message: 'Invalid email or password' });
});

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/subcategories', subcategoryRoutes); 


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});