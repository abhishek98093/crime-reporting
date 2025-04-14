const express = require('express');
const app = express();
const port = 3000;

const { createTable } = require("./config/createTable");
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const crimeRoutes = require('./routes/crimeRoutes');
const policeRoutes = require('./routes/policeRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Create tables before server starts handling requests
createTable()
  .then(() => {
    console.log("Table creation logic ran successfully");
  })
  .catch((err) => {
    console.error("Error in creating tables:", err.message);  // Log actual error
  });

// Route mounting
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/crime', crimeRoutes);
app.use('/api/police', policeRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Crime Report Management System Backend is running...');
});

// Server start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
