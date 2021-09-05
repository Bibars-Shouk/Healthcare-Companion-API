const express = require("express");
const router = express.Router();

const {
  createMedicalReport,
  getMedicalReport,
  toggleReportVisibility,
} = require("../controllers/medicalReports");

router.route("/").post(createMedicalReport);
router.route("/:id").get(getMedicalReport).put(toggleReportVisibility);

module.exports = router;
