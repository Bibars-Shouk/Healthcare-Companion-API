const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");

// DB config
const connectDB = require("./config/db");

// Error Handler
const errorHandler = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });

// connect to DB
connectDB();

// Route files
const medicalReports = require("./routes/medicalReports");
const prescriptions = require("./routes/prescriptions");
const healthTests = require("./routes/healthTests");
const auth = require("./routes/auth");
const account = require("./routes/account");

const app = express();

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(fileUpload());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/medical-reports", medicalReports);
app.use("/api/prescriptions", prescriptions);
app.use("/api/health-tests", healthTests);
app.use("/api/auth", auth);
app.use("/api/account", account);

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
