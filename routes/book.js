var express = require('express');
var router = express.Router();

var Book = require('../models/bookmodel');

//추가 post
//조회 get
//수정 put, patch
//삭제 delete


// 127.0.0.1:3000/book/select.json
router.get('/select.json', async function(req, res, next) {
    try {
        const result = await Book.find({}); //await 가 들어가면 function 앞에 async 꼭 넣기
        const data = {status:200, result:result};
        return res.send(data);
    }
    catch(e){
        constsole.error(e);
        return res.send({status:-1, result:e});
    }
});


// 127.0.0.1:3000/book/insert.json
// {title:"aaa", author:"bbb", price:123}
router.post('/insert.json', async function(req, res, next) {
    try {
        const book = new Book(); // 채울 값
        book.title = req.body.title;
        book.author = req.body.author;
        book.price = Number(req.body.price);

        // 실제로 DB에 저장하기
        const result = await book.save();
        console.log(result);
        if(result !== null){
            return res.send({status:200, result:result});
        }
        return res.send({status:0});
    }
    catch(e){
        console.error(e);
        return res.send({status:-1, result:e});        
    }
});


// 127.0.0.1:3000/book/test.json
router.get('/test.json', function(req, res, next) {
    try {
        const data = {status:200, result:'aaa'};
        res.send(data);
    }
    catch(e){
        constsole.error(e);
        res.send({status:-1, result:e});
    }
});


module.exports = router;
