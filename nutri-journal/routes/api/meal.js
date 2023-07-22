var express = require("express");
var router = express.Router();
const mealsCtrl = require('../../controllers/api/meal')

router.post("/", mealsCtrl.create);
router.get('/', mealsCtrl.listAll);
router.get('/search', mealsCtrl.listSome);
router.delete('/:_id', mealsCtrl.deleteOne);
router.put('/:_id', mealsCtrl.updateOne);

module.exports = router;