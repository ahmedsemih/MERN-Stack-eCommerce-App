const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
}, { versionKey: false });

const Image = mongoose.model('CarouselItem', ImageSchema);
module.exports = Image;