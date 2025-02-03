const marvelModel = require("../models/filmModels")
var jwt = require('jsonwebtoken');
require('dotenv').config()

const getAllFilms = async(req, res) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: "Authorization token required" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
           return res.json({
                message: "you are not an admin!"
            })
        }
        const response = await marvelModel.find({})
        res.json(response)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const getFilmsById = async(req, res) => {
    const token = req.headers.authorization
    const {id} = req.params;
    if (!token) {
        return res.status(401).json({ message: "Authorization token required" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
           return res.json({
                message: "you are not an admin!"
            })
        }
        const response = await marvelModel.findById(id)
        res.json(response)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const deleteFilm =  async(req, res) => {
    const token = req.headers.authorization
    const {id} = req.params;
    if (!token) {
        return res.status(401).json({ message: "Authorization token required" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
           return res.json({
                message: "you are not an admin!"
            })
        }
        const deletedResponse = await marvelModel.findByIdAndDelete(id)
        res.json(deletedResponse)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const postFilm = async(req, res) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: "Authorization token required" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
           return res.json({
                message: "you are not an admin!"
            })
        }
        const mrvl =  new marvelModel({...req.body})
        await mrvl.save()
        res.json(mrvl)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const editFilm = async(req,res) => {
    const token = req.headers.authorization
    const {id} = req.params;
    if (!token) {
        return res.status(401).json({ message: "Authorization token required" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
           return res.json({
                message: "you are not an admin!"
            })
        }
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