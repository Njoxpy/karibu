require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// ROUTES IMPORT
const animalFeedingRoutes = require("./routes/animalFeeding.routes");
const freshOilRoutes = require("./routes/freshOil.routes");
const godownRoutes = require("./routes/godown.routes");
const userRoutes = require("./routes/user.routes");
const printingRoutes = require("./routes/printing.routes");
const hardwareRoutes = require("./routes/hardware.routes");
const stationeryRoutes = require("./routes/stationery.routes");
const reportsRoutes = require("./routes/reports/reports")

// log
const log = require("./logs/logger");

// database
const connectDB = require("./config/DB");

// express app
const app = express();
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only frontend from localhost:5173
  })
);

app.use(express.json());
app.use(log)

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json("hello world from savarrah");
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100, 
  standardHeaders: "draft-8",
  legacyHeaders: false, 
});


// middleware
app.use(morgan("dev"));
app.use(limiter);

// register routes
app.use("/api/v1/animal-feeding", animalFeedingRoutes);
app.use("/api/v1/fresh-oil", freshOilRoutes);
app.use("/api/v1/godown", godownRoutes);
app.use("/api/v1/hardware", hardwareRoutes);
app.use("/api/v1/printing", printingRoutes);
app.use("/api/v1/stationery", stationeryRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reports", reportsRoutes);


// connect to DB
connectDB();

// listen requests
app.listen(process.env.PORT, () => {
  console.log(`Listening http://localhost:${process.env.PORT}/`);
});
