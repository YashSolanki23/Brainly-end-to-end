import mongoose from "mongoose";
import { Schema,model } from "mongoose";

export async function Connect() {

   try {
     await mongoose.connect("mongodb+srv://yashsolanki1129:bOZq3irPyZVO7ghy@cluster0.fsysivt.mongodb.net/?appName=Cluster0").then(()=>{
        console.log("Database is running succesfully!!!")
    })
   } catch (error) {
     console.log(error);
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

const Link=mongoose.model("Link",linkSchema);