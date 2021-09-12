const express = require("express");
const router = express.Router();
const {
  getHealthTest,
  setTestResults,
  getHealthTests,
  getRequestedTests,
} = require("../controllers/healthTests");
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(protect, authorize("Patient"), getHealthTests);

router
  .route("/requests/:accessCode")
  .get(protect, authorize("Medical-Facility-Worker"), getRequestedTests);

router
  .route("/:id")
  .get(protect, authorize("Medical-Facility-Worker", "Patient"), getHealthTest)
  .put(protect, authorize("Medical-Facility-Worker"), setTestResults);

module.exports = router;
