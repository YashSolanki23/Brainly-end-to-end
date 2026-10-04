import dotenv from "dotenv"
import mongoose from "mongoose";
import { Schema,model } from "mongoose";

dotenv.config()

export async function Connect() {
    try {
        const mongoUrl = process.env.MongoDB;

        if (!mongoUrl) {
            throw new Error("MongoDB connection string is missing");
        }

        await mongoose.connect(mongoUrl);

        console.log("Database is running successfully!!!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}


const userSchema= new mongoose.Schema({
  username:{type:String,required:true,unique:true},
  password:{type:String,required:true}
})

export const User=mongoose.model('User',userSchema)


const tagSchema=new mongoose.Schema({
  title:{type:String,required:true,unique:true}
})

export const Tag=mongoose.model('Tag',tagSchema)


const contentype=['image','audio','video','article']

const contentSchema=new mongoose.Schema({
    link:{type:String,required:true},
    type:{type:String,enum:contentype,required:true},
    title:{type:String,required:String},
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    userId:[{type: Schema.Types.ObjectId,ref:'User'}]

})

export const Content=mongoose.model('Content',contentSchema)


const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type:Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Link=mongoose.model("Link",linkSchema);