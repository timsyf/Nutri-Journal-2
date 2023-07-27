var express = require("express");
var router = express.Router();
const userSetUpCtrl = require('../../controllers/api/userSetUp')

router.post("/", userSetUpCtrl.create);
router.get("/:userId", userSetUpCtrl.listOneReturnBool);

module.exports = router;