const mongoose = require('mongoose');

// Connect to MongoDB 
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'DegreeNft'
    });
    console.log('MongoDB connected successfully..');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit with failure
  }
};

module.exports = {
  connectDatabase
};
