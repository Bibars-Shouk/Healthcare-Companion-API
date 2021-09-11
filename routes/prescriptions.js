const express = require("express");
const router = express.Router();

const {
  getPrescription,
  setPrescriptionAsFulfilled,
} = require("../controllers/prescriptions");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/:id")
  .get(protect, authorize("Patient"), getPrescription)
  .put(protect, authorize("Patient"), setPrescriptionAsFulfilled);

module.exports = router;
