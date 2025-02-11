
import express from 'express'
import { createTicketValidation, updateTicketValidation } from '../validitions/validitions'
import { changeTicketStatus, createTicket, deleteTicket, getTicket, getUserTickets, updateTicket } from '../controllers/ticket.controller'
import { loggerMiddleWare } from '../middlewares/logger.middleware'
import { RoleChackMiddleware } from '../middlewares/role.middleware'

const ticketRouter = express.Router()

ticketRouter.post("/ticket",loggerMiddleWare,createTicketValidation(),createTicket)
ticketRouter.get('/ticket',loggerMiddleWare,getUserTickets)
ticketRouter.get('/ticket/:id',loggerMiddleWare,getTicket)
ticketRouter.put('/ticket/:id',loggerMiddleWare,updateTicket)
ticketRouter.put("/ticket/update/:id",loggerMiddleWare,RoleChackMiddleware,changeTicketStatus)
ticketRouter.delete('/ticket/:id',loggerMiddleWare,deleteTicket)


export default ticketRouter
