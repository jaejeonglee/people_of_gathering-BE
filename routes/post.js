const express = require('express');
const Post = require('../schemas/post');
const router = express.Router();
const uniqid = require('uniqid');
const authMiddleware = require("../middlewares/auth");

router.use(express.json());
router.use(express.urlencoded({ extended : true }));

router.get('/post', async (req, res) => { //전체 게시글 조회(메인 페이지)
    const { category } = req.query; //카테고리 검색
    const post = await Posts.find({ category });
    res.json({ post });
});

router.get('/post/:postId', async (req, res) => { //게시글, 댓글 가져오기(상세 페이지)
    const { postId } = req.params;
    const post = await Post.find({ postId : postId });
    const comments = await Comments.find({ postId : postId })
    res.json({ post, comments });
});

router.post('/post', async (req, res) => { // 게시글 저장
    const postId = uniqid();
    const { userId, title, userName, createDate, deadLine, category, curMembers, maxMembers, contents  } = req.body;
    await Posts.create({ postId, userId, title, userName, createDate, deadLine, category, curMembers, maxMembers, contents });

    res.json({ success: "저장이 성공 하였습니다!!"});
});

router.delete('/delete/:postId', authMiddleware, async (req, res) => { //게시글 삭제
    const { postId } = req.params;
    await Posts.deleteOne({ postId : postId });
    res.json({ success : "삭제가 완료 되었습니다"});
});

router.patch('/modify/:postId', authMiddleware, async (req, res) => { //게시글 수정
    const { title, deadLine, category, maxMembers, contents } = req.body // 클라이언트에서 전달 받은 수정 할 내용
    const { postId } = req.params;
    await Posts.updateOne({postId}, {$set:{title, deadLine, category, maxMembers, contents}});
    res.json({ success : "수정 되었습니다" });
});

router.post('/join/:postId', authMiddleware, async (req, res) => { //참여인원 추가
    const { postId } = req.params;
    const { curMembers } = req.body;
    await Posts.updateOne({ postId }, { $push : { curMembers }});
    res.json({ success : "추가 되었습니다"});
});

router.patch('/join/:postId', authMiddleware, async (req, res) => { //참여 취소
    const { postId } = req.params;
    const { curMembers } = req.body;
    await Posts.updateOne({ postId }, { $pull: { curMembers }});
    res.json({ success : "참여 취소 되었습니다"});
});

module.exports = router;