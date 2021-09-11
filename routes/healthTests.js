const express = require("express");
const router = express.Router();
const { getHealthTest, setTestResults } = require("../controllers/healthTests");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/:id")
  .get(protect, getHealthTest)
  .put(protect, authorize("Medical-Facility-Worker"), setTestResults);

module.exports = router;
