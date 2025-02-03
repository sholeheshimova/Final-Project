const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')

const filmRouter = require("./routes/filmRoute")
const reviewRouter = require("./routes/reviewRoute")
const usersRouter = require("./routes/userRoute")
const loginRegisterRouter = require("./routes/loginregisterRoute")

const app = express()
const port = 8080



app.use(cors())
app.use(express.json())

app.use("/marvels", filmRouter)
app.use("/reviews", reviewRouter)
app.use("/users", usersRouter)
app.use("/", loginRegisterRouter)

mongoose.connect('mongodb+srv://solaehazmp202:shola123@cluster0.tdger.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {console.log('Connected!')
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
  });