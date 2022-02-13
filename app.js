const express = require('express');
const mongoose = require('mongoose');
const Post = require('./schemas/post');
const ejs = require('ejs');
const cors = require('cors');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comments');

mongoose.connect('mongodb://localhost:27017/mini_project', {
    ignoreUndefined: true,
    useNewUrlParser: true, //구문 분석 오류출력 없게해줌
    useUnifiedTopology: true, //현재 서버 검색 및 엔진 모니터링 방식을 더 이상 사용하지 않으므로 새로운 서버 및 엔진 모니터링 방식을 사용
}).catch((err) => { console.log(err) });

const db = mongoose.connection; //성공적으로 연결했거나 연결 오류가 발생하면 알림을 받아야한다.
db.on('error', console.error.bind(console, 'connection error:'));

const app = express();
const router = express.Router();

app.use(express.json());
app.use('/api', express.urlencoded({extended: false}), router); // API 요청에서 받은 body 값을 파싱(해석)하는 역할을 수행하는 것이 bodyParser
app.use('/api', postRouter,userRouter,commentRouter);
app.use(express.static('static'))

const corsOptions = {
    origin: '*',
    // credentials: true
};
app.use(cors(corsOptions));

app.listen(3000, () => {
    console.log( new Date().toLocaleString() , '서버가 요청을 받을 준비가 됐어요');
});