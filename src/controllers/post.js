const Post = require("../models/post");
const slugify = require("slugify");
const cloudinary=require('../uploads/cloudinary')
const fs=require('fs')

exports.createPost=async(req,res)=>{
  console.log("rosh")
  
  const { title, description, category, tags } = req.body
  
 console.log("rosh")
  const uploader=async(path)=>await cloudinary.uploads(path,'Images')
      
      const urls=[];
      const files=req.files
      for(const file of files){
          const {path}=file
          const newPath=await uploader(path)
          urls.push(newPath)
          fs.unlinkSync(path)
      }
      console.log(urls)  
      const memo = new Post({
          title,
          slug: slugify(title),
          description,
          postImg:urls,
          category,
          tags,
          createdBy: req.user._id,
          
      })
      memo.save((error,po)=>{
          if(error){
                 res.status(400).json(
                     {message:"something went wrong"}
                 )
          }
          if(po){
               res.status(200).json(
                   {data:{po}}
               )
          }
      }) 
 
}


exports.getPostByCategory=async(req,res)=>{
    const {category}=req.params
    if(category){
    Post.find({createdBy: req.user._id,category:category},(err,posts)=>{
              if(err){
                     res.status(400).json({
                         message:"something"
                     })
              }
              if(posts){
                    res.status(200).json({
                        posts
                    })
              }
    })
    }
}

exports.getPosts = async (req, res) => {
    try {
        const myMemos = await Post.find({ createdBy: req.user._id });
        res.status(200).json(myMemos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getPostById = (req, res) => {
    const { postId } = req.params;
    
    Post.findOne({ _id: postId }, (err, memodetail) => {
        if (err) {
            res.status(404).json({
                message: err.message
            })
        }
        if (memodetail) {
            res.status(200).json({
                memodetail
            })
        }
    })
}

exports.deletePostById = (req, res) => {
    const { postId } = req.body.payload;
    if (postId) {
      Post.deleteOne({ _id: postId }).exec((error, result) => {
        if (error) return res.status(500).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    } else {
      res.status(500).json({ error: "Params required" });
    }
  };
  
  





