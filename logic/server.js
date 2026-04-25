require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const timeout = require("connect-timeout");

const PORT = Number(process.env.PORT) || 4000;

// ROUTES
const animalFeedingRoutes = require("./routes/animalFeeding.routes");
const freshOilRoutes = require("./routes/freshOil.routes");
const godownRoutes = require("./routes/godown.routes");
const userRoutes = require("./routes/user.routes");
const printingRoutes = require("./routes/printing.routes");
const hardwareRoutes = require("./routes/hardware.routes");
const stationeryRoutes = require("./routes/stationery.routes");

// LOGGER + DB
const logger = require("./logs/logger");
const connectDB = require("./config/DB");
const createAdminUser = require("./createAdmin");

const app = express();

// --- MIDDLEWARE ---
app.use(logger);
app.use(morgan("dev"));
app.use(express.json());
app.use(timeout("30s"));

// Handle timeouts
app.use((req, res, next) => {
  if (!req.timedOut) next();
  else res.status(408).json({ error: "Request timed out" });
});

// CORS config
app.use(
  cors({
    origin: ["http://localhost:5173", "https://yourfrontend.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.options("*", cors());

app.use(helmet());
app.use(compression());

// Serve uploaded files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  }),
);

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: "Too many requests, please try again later.",
});

app.use(limiter);

// --- ROUTES ---
app.use("/api/v1/animal-feeding", animalFeedingRoutes);
app.use("/api/v1/fresh-oil", freshOilRoutes);
app.use("/api/v1/godown", godownRoutes);
app.use("/api/v1/hardware", hardwareRoutes);
app.use("/api/v1/printing", printingRoutes);
app.use("/api/v1/stationery", stationeryRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Karibu is running!" });
});

// Catch-all 404
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

const start = async () => {
  await connectDB();
  await createAdminUser();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
