import express from "express"
import { Jwt } from "jsonwebtoken";
import mongoose from "mongoose";
import { Connect } from "./db";


const app=express();
const port=3000;
Connect()

app.use(express.json())

app.post("/api/v1/signup",(req,res)=>{

})

app.post("/api/v1/signin",(req,res)=>{

})


app.post("/api/v1/content",(req,res)=>{

})


app.get("/api/v1/content",(req,res)=>{

})


app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})
