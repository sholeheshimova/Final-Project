const express = require('express')

const {
    getFilmsById,
    deleteFilm,
    postFilm,
    editFilm,
    getAllFilms,
} = require("../controllers/filmController")

const router = express.Router()

router.get("/", getAllFilms)
router.get("/:id", getFilmsById)
router.delete("/:id", deleteFilm)
router.post("/", postFilm)
router.put("/:id", editFilm)


module.exports = router
