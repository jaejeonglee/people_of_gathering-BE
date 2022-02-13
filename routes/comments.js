var express  = require('express');
var router = express.Router();
var Comment = require('../schemas/comments');
var Post = require('../schemas/post');
// var util = require('../util');
const authMiddleware = require("../middlewares/auth");
const cors = require('cors');

const corsOptions = {
    origin: '*',
    // credentials: true
};
router.use(cors(corsOptions));

// create
router.post('/comments/:postId',  async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const { userId, userName } = res.locals.user;
  const recentComment = await Comment.find().sort('-commentId').limit(1);
  let commentId = 1;
  if (recentComment.length != 0) {
    commentId = recentComment[0]['commentId'] + 1;
  }

  await Comment.create({ postId, userId, userName, commentId, content });
  res.send({ result: '성공' });
});

// comment list
router.get('/comments/:postId',  async (req, res) => {
  try {
    const { postId } = req.params;
    let comments = await Comment.find({ postId }).sort('commentId').lean();
    res.json({ comments });
  } catch (err) {
    console.error(err);
  }
});
// comment modify
router.put('/comments/:commentId',  async (req, res) => {
  const { userId, userName } = res.locals.user;
  const { commentId } = req.params;
  const { content } = req.body;
  const existsComment = await Comment.findOne({ userId, commentId });
  const { postId } = existsComment.postId;
  await Comment.updateOne(
    { commentId },
    { $set: { postId, userId, userName, commentId, content } }
  );
  res.send({ result: '성공' });
});

router.get('/comments/modify/:commentId',  async (req, res) => {
  const { commentId } = req.params;
  comment = await Comment.findOne({ commentId });
  res.json({ comment });
});

// comment destroy
router.delete('/comments/:commentId',  async (req, res) => {
  const { userId } = res.locals.user;
  const { commentId } = req.params;
  await Comment.deleteOne({ userId, commentId });
  res.send({ result: '성공' });
});



module.exports = router;

