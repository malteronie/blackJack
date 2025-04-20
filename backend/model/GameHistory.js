const mongoose = require('mongoose');

const GameHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    result: {
        type: String,
        enum: ['win', 'lose', 'draw'],
        required: true
    },
    playerScore: {
        type: Number,
        required: true
    },
    dealerScore: {
        type: Number,
        required: true
    },
    actions: [String]
});
module.exports = mongoose.model('GameHistory', GameHistorySchema);