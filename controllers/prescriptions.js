const Prescription = require("../models/Prescription");

const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc        get all prescription for patient by his id
// @route       GET /api/prescriptions
// @access      Private/Patient
exports.getPrescriptions = asyncHandler(async (req, res, next) => {
  const prescriptions = await Prescription.find({ patient: req.user.id })
    .select("-isFulfilled")
    .populate({
      path: "patient",
      select: "-_id firstName middleName lastName gender dateOfBirth",
    })
    .populate({
      path: "doctor",
      select: "-_id firstName middleName lastName",
      populate: {
        path: "doctor",
        select: "-_id specialty clinicName phoneNumbers",
      },
    });

  res.status(200).json({ success: true, data: prescriptions });
});

// @desc        get prescription by id
// @route       GET /api/prescriptions/:id
// @access      Private/Patient
exports.getPrescription = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const prescription = await Prescription.findById(id)
    .populate({
      path: "patient",
      select: "-_id firstName middleName lastName gender dateOfBirth",
    })
    .populate({
      path: "doctor",
      select: "-_id firstName middleName lastName",
      populate: {
        path: "doctor",
        select: "-_id specialty clinicName phoneNumbers",
      },
    });

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
// @access      Private/Patient
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
