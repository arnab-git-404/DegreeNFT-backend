const mongoose = require('mongoose');

const UniversityAddressSchema = new mongoose.Schema({
    
    universityName: {
        type: String,
        required: true,
        trim: true
    },
    university_ID: {
        type: Number,
        required: true,
        trim: true
    },
    universityState: {
        type: String,
        required: true,
        trim: true
    },
    universityWalletAddress: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    totalAllocated: {
        type: Number,
        default: 0
    },
    totalMinted: {
        type: Number,
        default: 0
    },

    });

    module.exports = mongoose.model('UniversityAddress', UniversityAddressSchema);
