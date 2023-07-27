var express = require("express");
var router = express.Router();
const weightLogCtrl = require('../../controllers/api/weightLogs')

router.post("/", weightLogCtrl.create);
router.get("/", weightLogCtrl.getByDate);
router.get("/date", weightLogCtrl.checkIfDateAndUserIdExist);
router.delete("/delete", weightLogCtrl.deleteWeight);

module.exports = router;