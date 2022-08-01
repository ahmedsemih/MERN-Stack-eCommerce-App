const mongoose = require('mongoose');

const MiniImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
}, { versionKey: false });

const MiniImage = mongoose.model('MiniImage', MiniImageSchema);
module.exports = MiniImage;