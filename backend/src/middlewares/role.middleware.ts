import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import prisma from "../prisma";
export async function RoleChackMiddleware(req:Request,res:Response,next:()=>void){
    try {
        const token = req.cookies['token']
        const user_id = jwt.decode(token)
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(user_id?.toString()!)
            },
        })
        if(user?.role === "ADMIN"){
            next()
        }else{
            res.status(401).json({message:"Not authorized"})
        }

        
    } catch (error) {
        
        console.error(error);
        res.status(500).json({message:"Not authorized"})
    }
}