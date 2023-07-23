var express = require("express");
var router = express.Router();
const foodsCtrl = require('../../controllers/api/foods')

router.post("/", foodsCtrl.create);
router.get('/', foodsCtrl.listAll);
router.get('/userfood', foodsCtrl.userFood);
router.get('/search', foodsCtrl.listSome);
router.delete('/:_id', foodsCtrl.deleteOne);
router.put('/:_id', foodsCtrl.updateOne);

module.exports = router;