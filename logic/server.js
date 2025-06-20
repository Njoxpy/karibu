require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const timeout = require("connect-timeout");

// ROUTES IMPORT
const animalFeedingRoutes = require("./routes/animalFeeding.routes");
const freshOilRoutes = require("./routes/freshOil.routes");
const godownRoutes = require("./routes/godown.routes");
const userRoutes = require("./routes/user.routes");
const printingRoutes = require("./routes/printing.routes");
const hardwareRoutes = require("./routes/hardware.routes");
const stationeryRoutes = require("./routes/stationery.routes");

// Logger import
const logger = require("./logs/logger");

// Database connection
const connectDB = require("./config/DB");

// Express app
const app = express();

// Middleware
app.use(logger);
app.use(morgan("dev")); // Logger
app.use(express.json());
app.use(timeout("30s")); // Request timeout

// Handle timeout
function haltOnTimeout(req, res, next) {
  if (!req.timedOut) next();
  else res.status(408).json({ error: "Request timed out" });
}
app.use(haltOnTimeout);

// cors configurations
app.use(
  cors({
    origin: ["http://localhost:5173", "https://yourfrontend.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Manually handle preflight (OPTIONS request)
app.options("*", cors());

app.use(helmet());
app.use(compression());

// Serve static files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests, please try again later.",
});

// Routes
app.use("/api/v1/animal-feeding", animalFeedingRoutes);
app.use("/api/v1/fresh-oil", freshOilRoutes);
app.use("/api/v1/godown", godownRoutes);
app.use("/api/v1/hardware", hardwareRoutes);
app.use("/api/v1/printing", printingRoutes);
app.use("/api/v1/stationery", stationeryRoutes);
app.use("/api/v1/users", userRoutes);

// 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/`);
  connectDB();
});
