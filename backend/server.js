const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./dbConnection')
const categoryRoutes = require('./Routes/categoryRoutes')
const productRoutes = require('./Routes/productRoutes')
const subcategoryRoutes = require('./Routes/subcategoryRoutes')

const port = 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(express.json());

connectDB()



// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/subcategories', subcategoryRoutes); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});