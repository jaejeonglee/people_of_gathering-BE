const mongoose = require('mongoose');


const connect = () => {
    mongoose.connect('mongodb://localhost:27017/mini_project', {
        ignoreUndefined: true,
        useNewUrlParser: true, //구문 분석 오류출력 없게해줌
        useUnifiedTopology: true, //현재 서버 검색 및 엔진 모니터링 방식을 더 이상 사용하지 않으므로 새로운 서버 및 엔진 모니터링 방식을 사용
    })
    .catch((err) => { console.log(err) });

    const db = mongoose.connection; //성공적으로 연결했거나 연결 오류가 발생하면 알림을 받아야한다.
    db.on('error', console.error.bind(console, 'connection error:'));
};

module.exports = connect;