var express = require('express');
var router = express.Router();

// 크롬에서 127.0.0.1:3000/users/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
