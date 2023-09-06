const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    picture: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['india', 'sports', 'world', 'business']
    },
    link: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema);
