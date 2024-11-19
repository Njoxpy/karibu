
require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

// ROUTES IMPORT
const animalFeedingRoutes = require("./routes/animalFeeding.routes")
const freshOilRoutes = require("./routes/freshOil.routes")
const godownRoutes = require("./routes/godown.routes")
const userRoutes = require("./routes/user.routes")

// express app
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json("hello world from savarrah")
})

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// register routes
app.use("/api/v1/animal-feeding", animalFeedingRoutes)
app.use("/api/v1/fresh-oil", freshOilRoutes)
app.use("/api/v1/godown", godownRoutes)
app.use("/api/v1/user", userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connected to DB && Listening http://localhost:${process.env.PORT}/`);
    })
  }
  )
  .catch((err) => {
    console.error(`failed to conect: ${err}`);
  })
