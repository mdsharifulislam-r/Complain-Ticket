import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createTicketService, deleteTicketService, getAllTicketsService, getTicketService, getUserTicketsService, updateTicketService } from "../services/ticket.service";
import { validationResult } from "express-validator";
import { getUserDetails } from "../services/auth.service";
import { UserType } from "../types/types";
export async function createTicket(req:Request,res:Response):Promise<any> {
    try {
        const token = req.cookies['token']
        const user_id = jwt.decode(token)
        const { subject, description } = req.body;
        const newTicket = await createTicketService({
            subject,
            description,
            user_id: parseInt(user_id?.toString()||"")
        });


        return res.json({
            message: "Ticket created successfully",
            ticket: newTicket
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export async function getTicket(req:Request, res:Response):Promise<any> {
    try {
        const { id } = req.params;
        const ticket = await getTicketService(parseInt(id));

        return res.json( ticket );

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export async function getAllTickets(req:Request, res:Response):Promise<any> {
    try {
        const { status,search }:any= req.query;
        const tickets = await getAllTicketsService(status,search);

        return res.json(tickets);

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export async function updateTicket(req:Request, res:Response):Promise<any> {
    try {
        const token = req.cookies['token']

     
        const user_id = jwt.decode(token)
        const { id } = req.params;
        const { subject, description } = req.body;

        if (!subject ||!description) {
            return res.status(400).json({ message: "Subject and description are required" });
        }

        const updatedTicket = await updateTicketService(parseInt(id), {
            subject,
            description
        }, parseInt(user_id?.toString()||""));

        return res.json({
            message: "Ticket updated successfully",
            ticket: updatedTicket
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export async function deleteTicket(req:Request, res:Response):Promise<any> {
    try {
        const token = req.cookies['token']

        if (!token) {
            return res.status(401).json({ message: "You are not authorized to access this resource" });
        }
        const user_id = jwt.decode(token)
        const { id } = req.params;

        await deleteTicketService(parseInt(id), parseInt(user_id?.toString()||""));

        return res.json({ status:true,message: "Ticket deleted successfully" });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export async function getUserTickets(req:Request, res:Response):Promise<any> {
    try {
        const token = req.cookies['token']

        if (!token) {
            return res.status(401).json({ message: "You are not authorized to access this resource" });
        }
        const user_id:any = jwt.decode(token)
        const user = await getUserDetails(parseInt(user_id))

        const { status, search }:any= req.query;

        const userTickets =user?.role=='CUSTOMER'? await getUserTicketsService(parseInt(user_id?.toString()!),status,search): await getAllTicketsService(status,search)

        return res.json(userTickets);

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


export async function changeTicketStatus(req:Request, res:Response):Promise<any> {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res
               .status(400)
               .json({ errors: errors.array().map((item) => item.msg) });
        }
        const token = req.cookies['token']

        if (!token) {
            return res.status(401).json({ message: "You are not authorized to access this resource" });
        }
        const user_id = jwt.decode(token)
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        await updateTicketService(parseInt(id), { status }, parseInt(user_id?.toString()!));

        return res.json({ message: "Ticket status updated successfully" });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

