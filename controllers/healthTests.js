const path = require("path");

const HealthTest = require("../models/HealthTest");
const AccessCode = require("../models/AccessCode");
const User = require("../models/User");

const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc        Get all the unfulfilled health tests for a patient by his id
// @route       GET /api/health-tests/
// @access      Private/patient
exports.getHealthTests = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const healthTests = await HealthTest.find({
    patient: id,
    isFulfilled: false,
  });
  res.status(200).json({ success: true, data: healthTests });
});

// @desc        Get a single health test by its id
// @route       GET /api/health-tests/:id
// @access      Private
exports.getHealthTest = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const healthTest = await HealthTest.findById(id);

  if (!healthTest) {
    return next(
      new ErrorResponse(`Resource not found with the id of ${id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: healthTest });
});

// @desc        Get all the requested health tests for a patient by access code
// @route       GET /api/health-tests/requests/:accessCode
// @access      Private/medical facility worker
// ? if the facility is a radiology center only return the radiology tests
// ? if the facility is a medical lab only return the lab tests
exports.getRequestedTests = asyncHandler(async (req, res, next) => {
  const { accessCode } = req.params;
  const access = await AccessCode.findOne({ code: accessCode });

  if (!access) {
    return next(new ErrorResponse(`Unauthorized action`, 401));
  }

  const { medicalFacilityWorker } = await User.findById(req.user.id).populate(
    "medicalFacilityWorker"
  );

  const queryOptions = {
    patient: access.patient,
    isFulfilled: false,
    testType:
      medicalFacilityWorker.facilityType === "Radiology-center"
        ? "Radiology-Test"
        : "Lab-Test",
  };

  const tests = await HealthTest.find(queryOptions);

  res.status(200).json({ success: true, data: tests });
});

// @desc        Upload results for a health test
// @route       PUT /api/health-tests/:id
// @access      Private/medical facility worker
exports.setTestResults = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const healthTest = await HealthTest.findById(id);

  if (!healthTest) {
    return next(
      new ErrorResponse(`Resource not found with the id of ${id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please include file/files to upload`, 400));
  }

  let results = [];

  // if one file then push to results
  // if more than one file then get the files array and put it in the results array
  req.files.results.length
    ? (results = req.files.results)
    : results.push(req.files.results);

  //files type checking
  let typeOfFilesAreAllowed = true;
  // files sizes checking
  let sizeOfFilesAreInRange = true;

  results.forEach((file) => {
    if (
      !file.mimetype.startsWith("image") &&
      !file.mimetype.includes("application/pdf")
    ) {
      typeOfFilesAreAllowed = typeOfFilesAreAllowed && false;
    }

    if (file.size > 1024 * 1024 * 18) {
      sizeOfFilesAreInRange = sizeOfFilesAreInRange && false;
    }
  });

  if (!typeOfFilesAreAllowed) {
    return next(
      new ErrorResponse(`You can only upload images and pdf files`, 400)
    );
  }

  if (!sizeOfFilesAreInRange) {
    return next(new ErrorResponse(`The Maximum size of a file is 18MB`, 400));
  }

  let resultsList = [];
  results.forEach((file, idx) => {
    //rename file
    file.name = `result_${idx}_${healthTest._id}${path.parse(file.name).ext}`;
    file.mv(`./public/uploads/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        return next(
          new ErrorResponse(`Something went wrong while uploading files`, 500)
        );
      }
    });
    resultsList.push(file.name);
  });

  await HealthTest.findByIdAndUpdate(id, {
    results: resultsList,
    isFulfilled: true,
  });

  res.send({ success: true });
});
