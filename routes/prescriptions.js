const express = require("express");
const router = express.Router();

const {
  getPrescription,
  setPrescriptionAsFulfilled,
  getPrescriptions,
} = require("../controllers/prescriptions");
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(protect, authorize("Patient"), getPrescriptions);

router
  .route("/:id")
  .get(protect, authorize("Patient"), getPrescription)
  .put(protect, authorize("Patient"), setPrescriptionAsFulfilled);

module.exports = router;
