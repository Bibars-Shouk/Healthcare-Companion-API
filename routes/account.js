const express = require("express");
const router = express.Router();
const {
  changeEmail,
  changePassword,
  updateProfileImage,
  updateHabits,
} = require("../controllers/account");
const { protect, authorize } = require("../middleware/auth");

router.route("/update-email").put(protect, changeEmail);
router.route("/update-password").put(protect, changePassword);
router.route("/update-profile-image").put(protect, updateProfileImage);
router.route("/update-habits").put(protect, authorize("Patient"), updateHabits);

module.exports = router;
