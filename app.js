var express = require('express');
const  mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session'); 
var app = express();


// DB setting

mongoose.connect('mongodb://localhost/mydb', {});


// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
//app.use(flash()); //플래쉬함수 초기화 req.flash함수 사용가능 
//app.use(session({secret:'MySecret', resave:true, saveUninitialized:true})); 

// Routes

app.use('/comments', util.getPostQueryString, require('./routes/comments')); 

// Port setting
var port = 3000;
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});


const commentRouter = require('./routers/comment');
