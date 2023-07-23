var express = require("express");
var router = express.Router();
const goalsCtrl = require('../../controllers/api/goals')

router.post("/", goalsCtrl.create);

module.exports = router;