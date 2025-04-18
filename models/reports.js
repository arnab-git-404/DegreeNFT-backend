const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    
  studentWallet: {
    type: String,
    required: true,
  },
  reportDetails: {
    type: String,
    required: true,
  },
  reportedOn: {
    type: Date,
  }
});

module.exports = mongoose.model("NFT Reports", ReportSchema);
