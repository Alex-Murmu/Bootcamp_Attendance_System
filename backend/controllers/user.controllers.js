import { success } from "zod";
import User from "../models/User.model.js";
import { TokenNize } from "../utils/auth.tokenizer.js";
import { LoginForm, SignupForm } from "../utils/input.validation.js";
import { HashedPassword } from "../utils/password.convetor.js";


// 1. POST auth/signup
export const SingUp = async(req,res)=>{
    const valid = SignupForm.safeParse(req.body);
    console.log(req.body)
    if(!valid.success) return res.status(401).json({success:false,error:"invalid Inputs"})
    const {name,email,password,role} = req.body;
    console.log("second")
   try {
      const user_Existance = await User.findOne({email:email});
    if(user_Existance) return res.status(400).json({success:false,error:"Email already exists"});
    const hashed_password = await HashedPassword(password);
    let  newUser = await User.create({
        name:name,
        email:email,
        password:hashed_password,
        role:role,
    });
console.log("third")
    if(!newUser) return res.status(400).json({success:false,error:"Sorry can't create account at This time please try again after some time"});
    newUser = newUser.toObject();
    delete newUser.password;
    delete newUser.createAt;
    delete newUser.updatedAt;
  console.log("success")

     return res.status(201).json({success:true,data:newUser});
   } catch (error) {
     return res.status(400).json({success:false,error:error.message})
   }
    
}
  // 2. POST auth/signin
export const Login = async(req,res)=>{
    const valid = LoginForm.safeParse(req.body);
    if(!valid.success) return res.status(400).json({success:false,error:"invalid inputs"});
    const {email,password} = req.body;
    try {
        const  user_existance = await User.findOne({email:email});
    if(!user_existance) return res.status(400).json({success:false,error:"Invalid email or password"});
    const passwordCheck = HashedPassword(password,user_existance.password);
    if(!passwordCheck) return res.status(400).json({success:true,error:"Invalid email or password"});
    
    const user = {
        _id:user_existance._id,
        name:user_existance.name,
        email:user_existance.email,
        role:user_existance.role
    };

    const token = TokenNize({_id:user_existance._id,role:user_existance.role})
    return res.status(200).json({success:true,data:{token:token}});
    } catch (error) {
        return res.status(400).json({success:false,error:error,message});
    }
};

// 3. GET auth/me
export const Profile = async(req,res)=>{
    try {
        const user_id = req.user._id;
        const user = await User.findById(user_id).select("-password");
        if(!user) return res.status(400).json({success:false,error:"User not found"});
        return res.status(200).json({success:true,data:{_id:user._id,name:user.name,email:user.email,role:user.role}});
    } catch (error) {
        return res.status(400).json({success:false,error:error.message});
    }
}

