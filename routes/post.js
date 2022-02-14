const express = require('express');
const Post = require('../schemas/post');
const Comment = require('../schemas/comments');
const router = express.Router();
const uniqid = require('uniqid');
const authMiddleware = require("../middlewares/auth");
const cors = require('cors');

const corsOptions = {
    origin: '*',
    // credentials: true
};

router.use(cors(corsOptions));
router.use(express.json());
router.use(express.urlencoded({ extended : true }));

router.get('/', async (req, res) => { //전체 게시글 조회(메인 페이지)
    const { category } = req.query; //카테고리 검색
    const post = await Post.find({ category });
    res.json({ post });
});

router.get('/:postId', async (req, res) => { //게시글, 댓글 가져오기(상세 페이지)
    const { postId } = req.params;
    console.log(postId)
    const post = await Post.find({ postId : postId });
    console.log(post)
    const comments = await Comment.find({ postId : postId })
    res.json({ post, comments });
});

router.post('/', async (req, res) => { // 게시글 저장
    const postId = uniqid();
    console.log(postId)
    const { userId, title, userName, createDate, deadLine, category, curMembers, maxMembers, contents  } = req.body;
    await Post.create({ postId, userId, title, userName, createDate, deadLine, category, curMembers, maxMembers, contents });

    res.json({ success: "저장이 성공 하였습니다!!"});
});

router.delete('/delete/:postId', async (req, res) => { //게시글 삭제
    const { postId } = req.params;
    await Post.deleteOne({ postId : postId });
    res.json({ success : "삭제가 완료 되었습니다"});
});

router.patch('/modify/:postId', async (req, res) => { //게시글 수정
    const { title, deadLine, category, maxMembers, contents } = req.body // 클라이언트에서 전달 받은 수정 할 내용
    const { postId } = req.params;
    await Post.updateOne({postId}, {$set:{title, deadLine, category, maxMembers, contents}});
    res.json({ success : "수정 되었습니다" });
});

router.post('/join/:postId', async (req, res) => { //참여인원 추가
    const { postId } = req.params;
    const { userName } = req.body;
    await Post.updateOne({ postId} , {$push: { curMembers : userName }})
    console.log(postId)
    res.json({ success : "추가 되었습니다"});
});

router.patch('/join/:postId', async (req, res) => { //참여 취소
    const { postId } = req.params;
    const { userName } = req.body;
    await Post.updateOne({ postId }, { $pull: { curMembers : userName }});
    res.json({ success : "참여 취소 되었습니다"});
});

module.exports = router;