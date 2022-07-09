import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"

import { postModel } from "./models/posts.js"
import  postsRoutes from "./routes/posts.js"

const app = express()
dotenv.config()
app.use(cors())
const PORT = process.env.PORT 
const CONNECTION_URL = process.env.CONNECTION_URL

const port = process.env || 5002

mongoose.connect(CONNECTION_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>
app.listen(PORT,()=>{console.log(`running on port: ${PORT}`)
 console.log(dotenv.config())
})

).catch((e)=>console.log(e))

app.use(express.json({limit:"500mb"}))
app.use(bodyParser.json({
  
  extended:true,
  limit:"600mb"

}))
app.use(bodyParser.urlencoded({
  
  extended:true,
  limit:"600mb"

}))



app.use("/posts",postsRoutes)


