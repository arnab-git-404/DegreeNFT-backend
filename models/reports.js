const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    
  universityWallet: {
    type: String,
    required: true,
  },
  studentWallet: {
    type: String,
    required: true,
  },
  nftIpfsHash: {
    type: String,
    required: true,
  },

  reportType: {
    type: String,
    required: true,
  },

  reportDetails: {
    type: String,
    required: true,
  },
  reportedOn: {
    type: Date,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  solutionDetails: {
    type: String,
    default: "",
  },
  resolvedDate: {
    type: Date,
  }
});

module.exports = mongoose.model("NFT Reports", ReportSchema);
