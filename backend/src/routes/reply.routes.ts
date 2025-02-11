

import express from "express";

const replyRouter = express.Router()

import { getAllReplies, giveComment } from '../controllers/reply.controller'
import { giveCommentValidation } from "../validitions/validitions";
import { loggerMiddleWare } from "../middlewares/logger.middleware";
import { RoleChackMiddleware } from "../middlewares/role.middleware";

replyRouter.post('/reply',loggerMiddleWare,RoleChackMiddleware,giveCommentValidation() ,giveComment)
replyRouter.get("/reply/:ticket_id",loggerMiddleWare,getAllReplies)

export default replyRouter