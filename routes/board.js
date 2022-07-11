var express = require('express');
var router = express.Router();



// 크롬에서 127.0.0.1:3000/board/test.json
router.get('/test.json', function(req, res, next) {
  const data = {no:1};
  res.send(data);
});



module.exports = router;

// 127.0.0.1:3000/board/
// 127.0.0.1:3000/member/
// 127.0.0.1:3000/item/
