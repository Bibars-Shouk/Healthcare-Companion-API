const express = require("express");
const router = express.Router();
const { getHealthTest, setTestResults } = require("../controllers/healthTests");

router.route("/:id").get(getHealthTest).put(setTestResults);

module.exports = router;
