require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const { connectDatabase } = require("./utils/database");

const app = express();

const allowedOrigin = process.env.FRONTEND_URL;

// Middleware
app.use(cors( {
  origin: allowedOrigin,
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(express.json());

// Connect to database (if using MongoDB)
if (process.env.MONGODB_URI) {
  connectDatabase();
}

// API Routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error: " + err.message });
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to DegreeNFT Backend Server !!!");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
