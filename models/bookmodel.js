// CMD> npm i mongoose --save
var mongoose = require('mongoose');
// CMD> npm i mongoose-sequence --save
const AutoIncrement = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;
var bookSchema = new Schema({
    _id     : Number, // 책번호, 고유값, 기본키, 자동증가
    title   : {type:String, default:''}, //제목
    author  : {type:String, default:''}, // 저자
    price   : {type:Number, default:0},  //가격
    regdate : {type:Date, default:Date.now}  //등록일, 현재시간으로 등록
});


bookSchema.plugin(AutoIncrement,
    {id:"SEO_BOOK_ID", inc_field:'_id'});
module.exports = mongoose.model('book', bookSchema);