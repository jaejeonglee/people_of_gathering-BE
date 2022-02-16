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
router.post('/:postId',  async (req, res) => {
  const { postId } = req.params;
  const { content, userId, userName } = req.body;
  const recentComment = await Comment.find().sort('-commentId').limit(1);
  let commentId = 1;
  if (recentComment.length != 0) {
    commentId = recentComment[0]['commentId'] + 1;
  }
  console.log(content)

  await Comment.create({ postId, commentId, content, userId, userName });
  res.send({ result: '성공' });
});

// comment list
router.get('/:postId',  async (req, res) => {
  try {
    const { postId } = req.params;
    let comments = await Comment.find({ postId }).sort('commentId').lean();
    res.json({ comments });
  } catch (err) {
    console.error(err);
  }
});
// comment modify
router.patch('/modify/:commentId',   async (req, res) => {
  // const { userId, userName } = res.locals.user;
  const { commentId } = req.params;
  const { content, userId, userName } = req.body;
  const existsComment = await Comment.findOne({ userId, commentId });
  // const { postId } = existsComment.postId;
  console.log(existsComment)
  await Comment.updateOne(
    { commentId },
    { $set: { content } }
  );
  res.send({ result: '성공' });
});

// router.get('/:commentId',  async (req, res) => {
//   const header = req.headers
//   console.log(header)
//   const { commentId } = req.params;
//   comment = await Comment.findOne({ commentId });
//   res.json({ comment });
// });

// comment destroy
router.delete('/delete/:commentId',  async (req, res) => {
  const { commentId } = req.params;
  await Comment.deleteOne({ commentId });
  res.send({ result: '성공' });
});



module.exports = router;

