require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const { connectDatabase } = require('./utils/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database (if using MongoDB)
if (process.env.MONGODB_URI) {
  connectDatabase();
}

// API Routes
app.use('/api', apiRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error: ' + err.message });
});



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});