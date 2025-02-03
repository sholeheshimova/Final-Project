const userModel = require("../models/userModels")

const getAllUsers = async (req,res) => {
    try {
        const users = await userModel.find({})
        res.json(users)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.json({message: "user not found"})
        }
        res.json(user)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const deleteUser = async (req,res) => {
    const {id} = req.params;
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deleteUser) {
            return res.json({message: "product not found"})
        }
        res.json(deleteUser)
    } catch (error) {
        res.json({
            message: "error"
        })
    }
}

const editUser = async (req,res) => {
    const {id} = req.params;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id,
            {...req.body},
            {new: true}
        );
        if (!updatedUser) {
            return res.json({
                message: "error"
            })
        }
        res.json(updatedUser)
    } catch (error) {
        res.json({message: error.message})
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    editUser,
}