var express = require('express');
var router = express.Router();
var v1 = require('./v1');
/* GET users listing. */
router.get('/', (req,res) => {
  res.status(200).send('Welocme to near.daily API');
})
router.use('/v1',v1);

module.exports = router;
