const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    user_id: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);