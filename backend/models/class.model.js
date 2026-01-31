import mongoose, { model } from "mongoose";

const ClassSchema = new mongoose.Schema({
     className: {type:String,required:true},
     teacherId: {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}, 
     studentIds: [{type:mongoose.Schema.Types.ObjectId,ref:"User"}], 
})

const Class = mongoose.model("Class",ClassSchema);
export default Class;
