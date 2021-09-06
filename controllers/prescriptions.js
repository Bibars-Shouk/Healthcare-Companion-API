const Prescription = require("../models/Prescription");

const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

//? TODO: get all prescriptions for a user by his id

// @desc        get prescription by id
// @route       GET /api/prescriptions/:id
// @access      Private
exports.getPrescription = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const prescription = await Prescription.findById(id);

  if (!prescription) {
    return next(
      new ErrorResponse(`Resource not found with the id of ${id}`),
      404
    );
  }

  res.status(200).json({ success: true, data: prescription });
});

// @desc        Set a prescription as fulfilled
// @route       PUT /api/prescriptions/:id
// @access      Private
exports.setPrescriptionAsFulfilled = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const prescription = await Prescription.findById(id);

  if (!prescription) {
    return next(
      new ErrorResponse(`Resource not found with the id of ${id}`),
      404
    );
  }

  await Prescription.findByIdAndUpdate(id, { isFulfilled: true });

  res.status(200).json({ success: true });
});
