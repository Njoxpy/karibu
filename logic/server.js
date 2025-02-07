require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
// const rateLimit = require("express-rate-limit");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const timeout = require("connect-timeout"); // Import timeout middleware

// ROUTES IMPORT
const animalFeedingRoutes = require("./routes/animalFeeding.routes");
const freshOilRoutes = require("./routes/freshOil.routes");
const godownRoutes = require("./routes/godown.routes");
const userRoutes = require("./routes/user.routes");
const printingRoutes = require("./routes/printing.routes");
const hardwareRoutes = require("./routes/hardware.routes");
const stationeryRoutes = require("./routes/stationery.routes");

// Logger import
const logger = require("./logs/logger"); // Update with the correct path

// database
const connectDB = require("./config/DB");

// express app
const app = express();

// Use the logger middleware (logs each request)
app.use(logger);

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5174", // Allow only frontend from localhost:5173
  })
);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use(helmet());

// Update CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.ALLOWED_ORIGIN
        : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable if using cookies/sessions
    maxAge: 86400, // Cache preflight requests for 24 hours
  })
);

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

app.use(express.json());

// Add timeout middleware (30 seconds timeout)
app.use(timeout("30s")); // 30 seconds timeout
app.use(haltOnTimeout); // Optional: handle timeout

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

// Serve Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   limit: 100,
//   standardHeaders: "draft-8",
//   legacyHeaders: false,
// });

// middleware
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
// app.use(limiter);

app.get("/", (req, res) => {
  res.json("hello world from savarrah");
  console.log(req.session);
});
// register routes
app.use("/api/v1/animal-feeding", animalFeedingRoutes);
app.use("/api/v1/fresh-oil", freshOilRoutes);
app.use("/api/v1/godown", godownRoutes);
app.use("/api/v1/hardware", hardwareRoutes);
app.use("/api/v1/printing", printingRoutes);
app.use("/api/v1/stationery", stationeryRoutes);
app.use("/api/v1/users", userRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Logs will be written to logs/file-YYYY-MM-DD.log

// connect to DB
connectDB();

// listen requests
app.listen(process.env.PORT, () => {
  console.log(`Listening http://localhost:${process.env.PORT}/`);
});

// Helper function to handle timeouts
function haltOnTimeout(req, res, next) {
  if (!req.timedOut) next();
  else res.status(408).json({ error: "Request timed out" });
}
