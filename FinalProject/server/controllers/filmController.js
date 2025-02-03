const marvelModel = require("../models/filmModels")

const getAllFilms = async(req, res) => {
    try {
        const response = await marvelModel.find({})
        res.json(response)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const getFilmsById = async(req, res) => {
    const {id} = req.params;
    try {
        const response = await marvelModel.findById(id)
        res.json(response)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const deleteFilm =  async(req, res) => {
    const {id} = req.params;
    try {
        const deletedResponse = await marvelModel.findByIdAndDelete(id)
        res.json(deletedResponse)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const postFilm = async(req, res) => {
    try {
        const mrvl = marvelModel({...req.body})
        await mrvl.save()
        res.json(mrvl)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const editFilm = async(req,res) => {
    const {id} = req.params;
    try {
        const updatedFilm = await marvelModel.findByIdAndUpdate(id,
            {...req.body},
            {new: true}
        );
        if (!updatedFilm) {
            return res.json({
                message: "error"
            })
        }
        res.json(updatedFilm)
    } catch (error) {
        res.json({message: error.message})
    }
};

module.exports = {
    getAllFilms,
    getFilmsById,
    deleteFilm,
    postFilm,
    editFilm,
}