const express = require("express");
const router = express.Router();
// const multer = require("multer")
const { requireSignin } = require("../middleware");
const { createPost, getPosts, getPostById ,deletePostById, getPostByCategory } = require("../controllers/post");
const upload=require('../uploads/multer')

router.post('/posts/create',requireSignin,upload.array('postImg'),createPost)

router.get("/posts/getPosts", requireSignin, getPosts);

router.get("/posts/:postId", requireSignin, getPostById);
router.delete(
  "/posts/deletePostById",
  requireSignin,
  deletePostById
);
router.get("/posts/category/:category",requireSignin,getPostByCategory)

module.exports = router;