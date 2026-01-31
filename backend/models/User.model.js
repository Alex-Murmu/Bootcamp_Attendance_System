import mongoose from "mongoose";

const UserShcema = new mongoose.Schema({
  name: {type:String,required:true},
  email: {type:String,required:true,unique:true},
  password: {type:String,required:true}, // hashed with bcrypt
  role:{type:String,enum:["student","teacher"],requierd:true}

})

const User = mongoose.model("User",UserShcema);
export default User;
