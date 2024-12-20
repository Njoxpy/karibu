
require('dotenv').config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")

// ROUTES IMPORT
const animalFeedingRoutes = require("./routes/animalFeeding.routes")
const freshOilRoutes = require("./routes/freshOil.routes")
const godownRoutes = require("./routes/godown.routes")
const userRoutes = require("./routes/user.routes")
const printingRoutes = require("./routes/printing.routes")
const hardwareRoutes = require("./routes/hardware.routes")
const stationeryRoutes = require("./routes/stationery.routes")

// database
const connectDB = require('./config/DB')

// express app
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json("hello world from savarrah")
})

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
})


// middleware
app.use(morgan("dev"))
app.use(limiter)

// register routes
app.use("/api/v1/animal-feeding", animalFeedingRoutes)
app.use("/api/v1/fresh-oil", freshOilRoutes)
app.use("/api/v1/godown", godownRoutes)
app.use("/api/v1/hardware", hardwareRoutes)
app.use("/api/v1/printing", printingRoutes)
app.use("/api/v1/stationery", stationeryRoutes)
app.use("/api/v1/users", userRoutes)

// connect to DB
connectDB()

// listen requests
app.listen(process.env.PORT, () => {
  console.log(`Listening http://localhost:${process.env.PORT}/`);
})