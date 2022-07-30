const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    OrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required,
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;