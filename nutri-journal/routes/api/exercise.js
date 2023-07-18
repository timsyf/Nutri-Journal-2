var express = require("express");
var router = express.Router();
const exercisesCtrl = require('../../controllers/api/exercises')

router.post("/", exercisesCtrl.create);
router.get('/', exercisesCtrl.listAll);
router.get('/:id', exercisesCtrl.listOne);
router.delete('/:id', exercisesCtrl.deleteOne);
router.put('/:id', exercisesCtrl.updateOne);

module.exports = router;