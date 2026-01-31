import bcrypt from "bcrypt";

export const HashedPassword = async(password)=>{
    const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password,salt)
      return hash;
}

export const VerifyPassword = async(password,DBpassword)=>{
  return  await  bcrypt.compare(password,DBpassword);
 
}