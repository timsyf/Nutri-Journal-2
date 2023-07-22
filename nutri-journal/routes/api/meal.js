var express = require("express");
var router = express.Router();
const mealsCtrl = require('../../controllers/api/meal')

router.post("/", mealsCtrl.create);
router.get('/', mealsCtrl.listAll);
router.get('/:id', mealsCtrl.listOne);

module.exports = router;