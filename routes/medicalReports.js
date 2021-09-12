const express = require("express");
const router = express.Router();

const {
  createMedicalReport,
  getMedicalReport,
  toggleReportVisibility,
  getPatientMedicalReports,
  getMedicalReports,
} = require("../controllers/medicalReports");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/:accessCode")
  .post(protect, authorize("Doctor"), createMedicalReport);

router
  .route("/history/:accessCode")
  .get(protect, authorize("Doctor"), getPatientMedicalReports);

router.route("/history").get(protect, authorize("Patient"), getMedicalReports);

router
  .route("/:id")
  .get(protect, authorize("Patient", "Doctor"), getMedicalReport)
  .put(protect, authorize("Patient"), toggleReportVisibility);

module.exports = router;
