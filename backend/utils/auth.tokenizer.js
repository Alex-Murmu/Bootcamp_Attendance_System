import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = "sdada";
export const TokenNize = (args)=>{
    return  jwt.sign(args,jwtSecret,{expiresIn:"2d"});
}

export const VerifyToken = (token)=>{
    return  jwt.verify(token,jwtSecret);
    
}


