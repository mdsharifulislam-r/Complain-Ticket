import { Request, Response } from "express";
import { createCommentService, getCommentService } from "../services/reply.service";
import jwt from 'jsonwebtoken'
import { ReplyTypes } from "../types/types";
import { validationResult } from "express-validator";
export async function giveComment(req:Request,res:Response):Promise<any> {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map((item) => item.msg) });
        }
        const token = req.cookies['token']
        const user_id = jwt.decode(token)
        console.log(req.body);
        
        const { content, ticket_id } = req.body;
        const data:ReplyTypes={
            content,
            admin_id: parseInt(user_id?.toString()!),
            ticket_id
        }
        await createCommentService(data);
    
    
        res.status(200).json({ message: "Reply posted successfully" });
    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export async function getAllReplies(req:Request,res:Response):Promise<any> {
    try {
        const { ticket_id } = req.params;
        const replies = await getCommentService(parseInt(ticket_id));
    
        res.status(200).json(replies);

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}