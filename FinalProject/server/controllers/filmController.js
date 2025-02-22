const marvelModel = require("../models/filmModels");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllFilms = async (req, res) => {
  console.log(req.headers);

  const tokenHeader = req.headers.authorization;
  console.log(tokenHeader);

  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    console.log("token yoxdur veya sehvdir");

    return res.status(401).json({ message: "Authorization token required" });
  }

  const token = tokenHeader.split(" ")[1];
  console.log(token);

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    const response = await marvelModel.find({});
    res.json(response);
  } catch (error) {
    res.json({
      message: "error",
    });
  }
};

const getFilmsById = async (req, res) => {
  const tokenHeader = req.headers.authorization;
  const { id } = req.params;

  if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
    console.log("token yoxdur veya sehvdir");

    return res.status(401).json({ message: "Authorization token required" });
  }

  const token = tokenHeader.split(" ")[1];
  console.log(token);

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    const response = await marvelModel.findById(id);
    res.json(response);
  } catch (error) {
    res.json({
      message: "error",
    });
  }
};

const deleteFilm = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  
  const { id } = req.params;
  console.log(id);
  
  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }
  try {
    const jwtToken = token.split(" ")[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(decoded);
    
    

    if (decoded.role !== "admin") {
   
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const deletedResponse = await marvelModel.findByIdAndDelete(id);
    res.json({
      message: "done", deletedResponse
    })
    console.log(deletedResponse);
    
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

const postFilm = async (req, res) => {
  const token = req.headers.authorization;
  console.log("Gələn Token:", token); 
  
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token required" });
  }
  
 
  const jwtToken = token.split(" ")[1];
  
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    const newFilm =  new marvelModel({...req.body})
    await newFilm.save();
    res.status(201).json({
      message: "Posted successfully"
    })

    
  } catch (error) {
    console.error("Token Xətasi:", error.message);
    return res.status(401).json({ message: "error", error: "invalid token" });
  }
  
};


const editFilm = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
     
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const updatedFilm = await marvelModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.json(updatedFilm);
  } catch (error) {

    res.json({ message: error.message });
  }
};

module.exports = {
  getAllFilms,
  getFilmsById,
  deleteFilm,
  postFilm,
  editFilm,
};
