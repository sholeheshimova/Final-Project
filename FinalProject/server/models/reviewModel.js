const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    film: { 
        type: Schema.Types.ObjectId, 
        ref: 'Marvel', 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    comment: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        min: 1, 
        max: 10 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const reviewModel = mongoose.model("Review", reviewSchema)
module.exports = reviewModel