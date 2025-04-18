const mongoose = require('mongoose');

const StudentDataSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    studentWalletAddress: {
        type: String,
        required: true,
        trim: true
    },
    studentTotalMintedNFT: {
        type: Number,
        default: 0
    },
    universityWalletAddress: {
        type: String,
        required: true,
        trim: true
    },
    universityName: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    totalAllocatedNFTs: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('StudentData', StudentDataSchema);

