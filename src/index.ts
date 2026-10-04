import express from "express"
import  jwt  from "jsonwebtoken";
import mongoose from "mongoose";
import { Connect, Content, User,Link } from "./db";
import cors from "cors"
import { HashPassword, JWT_password, VerifyPassword } from "./config";
import { middleware } from "./middleware";
import { random } from "./utils";



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
  "msg":"deleted"
})

})


app.post("/api/v1/brain/share",middleware,async (req,res)=>{
    const share=req.body.share;

    if(share){
        const existingLink=await Link.findOne({

            //@ts-ignore
             userId:req.userId
        })
        if(existingLink)
        {
            res.json({
                hash:existingLink.hash
            })

            return;
        }
        const hash=random(10);
        await Link.create({
            //@ts-ignore
            userId:req.userId,
            hash:hash
        })

        res.json({
            hash
        })
    }else{
        await Link.deleteOne({
            //@ts-ignore
            userId:req.userId
        });

        res.json({
           "msg":"Removed Link"
        })
    }
})
//@ts-ignore
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await Link.findOne({
        hash: hash
    });

    if (!link) {
        res.status(404).json({
            message: "Sorry, incorrect input"
        });
        return;
    }

    const content = await Content.find({
        userId: link.userId
    });

    const user = await User.findOne({
        _id: link.userId
    });

    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }

    res.json({
        username: user.username,
        content: content
    });
});



app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})
