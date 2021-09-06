const express = require("express");
const router = express.Router();

const { getPrescription, setPrescriptionAsFulfilled } = require("../controllers/prescriptions");

router.route("/:id").get(getPrescription).put(setPrescriptionAsFulfilled);

module.exports = router;
