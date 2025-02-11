import { Request, Response } from "express";
import jwt from "jsonwebtoken"
export function loggerMiddleWare(req:Request,res:Response,next:()=>void){
    try {
        const token = req.cookies['token']
      
        const verify = jwt.verify(token,process.env.JWT_SECRET!)
        if(verify){
            next()
        }
        else{
            res.status(401).json({message:"Not authorized"})
        }
    } catch (error) {
        
        console.error(error);
        res.status(500).json({message:"Not authorized"})
    }
}
