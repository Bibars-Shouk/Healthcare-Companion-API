const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// DB config
const connectDB = require("./config/db");

// Error Handler
const errorHandler = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });

// connect to DB
connectDB();

// Route files
const medicalReports = require("./routes/medicalReports");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/medical-reports", medicalReports);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} `
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => {
    // exit with failure
    process.exit(1);
  });
});
