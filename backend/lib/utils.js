import jwt from 'jsonwebtoken'

export const generateToken = (userId,res)=>{

  const token = jwt.sign({userId},process.env.JWT_SECRET_KEY)

  res.cookie("token",token,{
    httpOnly: false,//prevents XSS attacks cross-site scripting attacks
    secure: process.env.NODE_ENV === "production" ? true : false, // true for https
    sameSite: "strict" // "strict" or "lax" CSRF protection 
  })

  return token;
}


