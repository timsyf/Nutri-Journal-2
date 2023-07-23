var express = require("express");
var router = express.Router();
const goalsCtrl = require('../../controllers/api/goals')

router.post("/", goalsCtrl.create);
router.get('/', goalsCtrl.listAll);
router.get('/userfood', goalsCtrl.userFood);
router.get('/search', goalsCtrl.listSome);
router.get('/review/:id', goalsCtrl.listOne);
router.delete('/:_id', goalsCtrl.deleteOne);
router.put('/:_id', goalsCtrl.updateOne);

module.exports = router;