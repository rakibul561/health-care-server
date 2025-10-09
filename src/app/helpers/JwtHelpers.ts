import jwt, { Secret } from "jsonwebtoken";


 

 const generateToken = (payload:any, secret:Secret, expiresIn:string) =>{
    const token = jwt.sign(payload, "abcd", {
            algorithm:'HS256',
            expiresIn:"1h"
        })

        return token
        
 }

 export const jwtHelper = {
    generateToken
 }