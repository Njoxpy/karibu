require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
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
app.use(morgan("combined")); // Logger
app.use(express.json());
app.use(timeout("30s")); // Request timeout

// Handle timeout
function haltOnTimeout(req, res, next) {
  if (!req.timedOut) next();
  else res.status(408).json({ error: "Request timed out" });
}
app.use(haltOnTimeout);

// CORS Configuration
const allowedOrigins = ["http://localhost:5173", "https://yourfrontend.com"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(helmet());
app.use(compression());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  })
);

// Serve static files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Savarrah API",
      version: "1.0.0",
      description: "API documentation for Savarrah",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests, please try again later.",
});

app.use(limiter);

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

// Connect to DB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/`);
});
