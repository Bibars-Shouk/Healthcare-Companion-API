const express = require("express");
const router = express.Router();

const {
  createMedicalReport,
  getMedicalReport,
} = require("../controllers/medicalReports");

router.route("/").post(createMedicalReport);
router.route("/:id").get(getMedicalReport);

module.exports = router;
