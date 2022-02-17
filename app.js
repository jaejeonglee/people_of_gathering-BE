const express = require('express');
const connect = require('./schemas');
const cors = require('cors');
const morganMiddleware = require('./config/morganMiddleware');
global.logger || (global.logger = require('./config/logger'));

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comments');

const app = express();
const router = express.Router();

connect();

app.use(morganMiddleware);
app.use(express.json());
app.use('/', express.urlencoded({extended: false}), router); // API 요청에서 받은 body 값을 파싱(해석)하는 역할을 수행하는 것이 bodyParser
app.use('/post', postRouter); //휴먼에러 방지(router 분리)
app.use('/user', userRouter);
app.use('/comment', commentRouter);
app.use(express.static('static'))

const corsOptions = {
    origin: '*',
    // credentials: true
};

app.use(cors(corsOptions));

app.listen(3000, () => {
    console.log( new Date().toLocaleString() , '서버가 3000포트로 요청을 받을 준비가 됐어요');
});