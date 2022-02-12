const mongoose = require('mongoose');

const postSchema = mongoose.Schema({   //Schema 생성
    postid : {
        type: Number,
        unique : true, //유니크 값
        required : true //필수 값
    },
    userId : {
        type: String
    },
    title : {        //게시글 제목
        type: String
    },
    userName : {     //사용자 이름
        type : String
    },
    contents : {     //게시글 내용
        type : String
    },
    createDate : { //게시글 생성날짜
        type : String
    },
    deadLine : {    //게시글 마감날짜
        type : String
    },
    maxMembers : {  //스터디 모집인원
        type : Number
    },
    curMembers : {  //스터디 참여인원
        type : Object
    },
    category : {    //카테고리
        type : String
    }

});

module.exports = mongoose.model('Post', postSchema); //모델 이름 'Post' 