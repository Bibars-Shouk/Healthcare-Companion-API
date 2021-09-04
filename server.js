const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Route files
const medicalReports = require("./routes/medicalReports");

dotenv.config({ path: "./config/config.env" });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/medical-reports", medicalReports);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} `
  );
});
