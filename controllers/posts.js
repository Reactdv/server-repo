import express from "express"
import { postModel } from "../models/posts.js"
import mongoose from "mongoose"

const getPosts = async(req,res)=>{
  try{
    const postMessage = await postModel.find()
    res.status(200).json(postMessage)
    
  }catch(error){
    res.send(error).json(error)
  }
}

const getPost = async(req,res)=>{
    const { id } = req.params
 
  try{
    const post = await postModel.findById(id)
    res.status(200).json(post)
  }catch(error){
    res.send(error).json(error)
  }
}

const createPost = async(req,res)=>{
  const {
    title,
    creator,
    message,
    tags,
    selectedFile
  } = req.body
  
  const newPostMessage = new postModel({
    title,
    creator,
    message,
    tags,
    selectedFile
  })
  
  try{
    await newPostMessage.save()
    res.status(201).json(newPostMessage)
    console.log(newPostMessage)
  }catch(error){
    res.send(error).json(error)
  }
}

 const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await postModel.findByIdAndUpdate(id, updatedPost, { new: true });
    console.log(`updatedPost:${updatedPost}`)
    res.json(updatedPost);
}

const deletePost = async(req,res)=>{
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)
  
  await postModel.findByIdAndRemove(id)
  console.log(`delete ${deletePost}`)
  res.json("post deleted")
  
}
 
  const likePost = async()=>{
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post = await postModel.findById(id)
  
  const updatedPost = await postModel.findByIdAndUpdate(
    id,
   { likeCount:post.likeCount + 1},
   {new:true}
   
    )
    res.json(updatedPost)
 }



export { 
       createPost,
       getPost,
       getPosts,
       deletePost,
       updatePost,
       likePost
  
}
