import mongoose from "mongoose"

const postSchema = mongoose.Schema({
  
  title:String,
  creator:String,
  message:String,
  tags:[String],
  selectedFile:String,
  likes:Number,
  createdAt:{
    type: Date,
    default: new Date()
  }
  
})

const postModel = mongoose.model("appdata",postSchema)

export { postModel }