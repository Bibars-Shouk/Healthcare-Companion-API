const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  getAccessCode,
} = require("../controllers/auth");
const { protect, authorize } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/access-code").get(protect, authorize("Patient"), getAccessCode);

module.exports = router;
