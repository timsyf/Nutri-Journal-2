var express = require("express");
var router = express.Router();
const foodsCtrl = require('../../controllers/api/foods')

router.post("/", foodsCtrl.create);
router.get('/', foodsCtrl.listAll);
router.get('/:id', foodsCtrl.listOne);

module.exports = router;