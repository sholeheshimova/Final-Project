const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marvelSchema = new Schema({
    image: String,
    title: String,
    description: String,
    date: Number,
    raiting: Number
})


const marvelModel = mongoose.model("Marvel", marvelSchema)

module.exports = marvelModel