const reviewModel = require("../models/reviewModel")

const getReviewByFilm = async (req,res) => {
    const {filmId} = req.params;
    try {
        const reviews = await reviewModel.find({film: filmId}).sort({createdAt: -1})
        res.json(reviews)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
};


const postReview = async (req,res) => {
    const {filmId, author, comment, rating} = req.body;
    try {
        const newReview = new reviewModel({
            film: filmId,
            author,
            comment,
            rating
        })
        await newReview.save();
        res.json(newReview)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
};

module.exports = {
    getReviewByFilm,
    postReview
}