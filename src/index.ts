import express from "express"
import  jwt  from "jsonwebtoken";
import mongoose from "mongoose";
import { Connect, Content, User } from "./db";
import cors from "cors"
import { HashPassword, JWT_password, VerifyPassword } from "./config";
import { middleware } from "./middleware";



const app=express();
const port=3000;
Connect()

app.use(express.json())
app.use(cors());


app.post("/api/v1/signup",async (req,res)=>{
     
   const username=req.body.username;
   const password=req.body.password;
    
   
   try{
const hashe=await HashPassword(password)

    await User.create({
       username:username,
       password:hashe
    })

    res.json({
        msg:"User signed up"
    })
   }
   catch(e){
    res.status(411).json({
        message:"User already Exists"
    })
   }


})

app.post("/api/v1/signin",async(req,res)=>{

    const username=req.body.username;
    const password=req.body.username;
try{
         const existingUser = await User.findOne({
            username
        });

        if (!existingUser) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        const isPasswordCorrect = await VerifyPassword(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }

        const token = jwt.sign({
            id:existingUser._id
        },JWT_password)

    
      return  res.json({
            token
        })
     } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})


app.post("/api/v1/content",middleware,async (req,res)=>{

const link=req.body.link
const type=req.body.type

await Content.create({
    link,
    type,
    title:req.body.title,
    //@ts-ignore
    userId:req.userId,
    tags:[],
   
    

})

res.json({
    message:"Content Added"
})


})


app.get("/api/v1/content",middleware,async (req,res)=>{
//@ts-ignore
const userId=req.userId;
const content=await Content.find({
    userId:userId
}).populate("userId","username")
 
res.json({
    content
})

})


app.delete("/api/v1/content",middleware,async (req,res)=>{
const contentId=req.body.contentId

await Content.deleteMany({
    contentId,
    //@ts-ignore
    userId:userId

})

res.json({
  deleted
})

})


app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})
