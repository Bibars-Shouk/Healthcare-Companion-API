const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  getAccessCode,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controllers/auth");
const { protect, authorize } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/logout").get(protect, logout);
router.route("/access-code").get(protect, authorize("Patient"), getAccessCode);
router.route("/forgot-password").put(forgotPassword);
router.route("/reset-password").put(resetPassword);

module.exports = router;
