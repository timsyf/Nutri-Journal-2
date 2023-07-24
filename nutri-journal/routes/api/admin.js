var express = require("express");
var router = express.Router();
const adminCtrl = require('../../controllers/api/admin')

router.post("/", adminCtrl.create);
router.get('/', adminCtrl.listAll);
router.get('/search', adminCtrl.listSome);
router.delete('/:_id', adminCtrl.deleteOne);
router.put('/:_id', adminCtrl.updateOne);
 
module.exports = router;