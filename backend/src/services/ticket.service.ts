import prisma from "../prisma";
import { deleteCommentService } from "./reply.service";

export async function createTicketService(data:any) {
    try {
        const newTicket = await prisma.ticket.create({
            data: data
        })
        return newTicket;
        
    } catch (error) {
        console.log(error);
        
        throw new Error("Something went wrong")
    }
}

export async function getTicketService(id:number) {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                ticket_id:id
            }
        })
        return ticket;
        
    } catch (error) {
        console.log(error);
        
        throw new Error("Something went wrong")
    }
}

export async function getAllTicketsService(status?:string,search?:string) {
    try {
        let tickets = await prisma.ticket.findMany()
        if(status) {
            tickets = tickets.filter(t => t.status === status)
        }
        if(search) {
            tickets = tickets.filter(t => t.subject.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
        }
        return tickets.reverse();
        
    } catch (error) {
        console.log(error);
        
        throw new Error("Something went wrong")
    }
}

export async function updateTicketService(id:number,data:any,user_id:number) {
    try {
        const updatedTicket = await prisma.ticket.update({
            where: {
                ticket_id: id,

            },
            data: data
        })
        return updatedTicket;
        
    } catch (error) {
        console.log(error);
        
        throw new Error("Something went wrong")
    }
}

export async function deleteTicketService(id:number,user_id:number) {
    try {
        const deletedTicket = await prisma.ticket.delete({
            where: {
                ticket_id: id,
                user_id
            },
        })
        await deleteCommentService(id)
        return deletedTicket;
        
    } catch (error) {
        console.log(error);
        
        throw new Error("Something went wrong")
    }
}

export async function getUserTicketsService(userId:number,status?:string,search?:string) {
    try {
        let userTickets = await prisma.ticket.findMany({
            where: {
                user_id: userId,
            },
        })
        if(status) {
            userTickets = userTickets.filter(t => t.status === status)
        }
        if(search) {
            userTickets = userTickets.filter(t => t.subject.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
        }

        return userTickets.reverse();
        
    } catch (error) {
        console.log(error);
        
        throw new Error("Something went wrong")
    }
}

export async function changeTicketStatusService(ticket_id:number,status:any){
    try {
        const updatedTicket = await prisma.ticket.update({
            where: {
                ticket_id
            },
            data: {
                status
            }
        })
        return updatedTicket;
        
    } catch (error) {
        console.log(error);
        
        throw new Error("Something went wrong")
    }

}
