import { VerifyToken } from "../utils/auth.tokenizer.js";


export const AuthMiddleware = async(req,res,next)=>{
try {
        let token = req.headers.authorization;
        console.log(":token",token)
    if(!token) return res.status(400).json({success:false,error:"No Credentials ..."});
    if(token.startsWith("Bearer ")||!token){
        token = token.split(" ")[1];
    }
    const  decoded = VerifyToken(token);
    if(!decoded) return  res.status("Error Credentials");
    req.user = decoded;
    next();
} catch (error) {
    return res.status(400).json({success:false,error:error.message});
}
}

