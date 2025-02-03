const express = require('express');

const {getReviewByFilm,postReview} = require("../controllers/reviewController")

const router = express.Router()

router.get("/:filmId", getReviewByFilm)
router.post("/", postReview)

module.exports = router;