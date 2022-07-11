var express = require('express');
var router = express.Router();

// 크롬에서 127.0.0.1:3000/abc.json
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 크롬에서 127.0.0.1:3000/aaa/abc.json
router.get('/abc.json', function(req, res, next) {
console.log(req,query);
const data = {userid:'abc'};
res.send(data);
});

module.exports = router;

