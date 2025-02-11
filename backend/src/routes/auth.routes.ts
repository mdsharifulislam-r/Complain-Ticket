import express from 'express'
import { getUser, loginUser, logoutUser, registerUser } from '../controllers/auth.controller'
import { loginValidation, registerValidation } from '../validitions/validitions'
import { loggerMiddleWare } from '../middlewares/logger.middleware'
import { RoleChackMiddleware } from '../middlewares/role.middleware'

const authRouter = express.Router()

authRouter.post("/auth/register",registerValidation(),registerUser)
authRouter.post("/auth/login",loginValidation(),loginUser)
authRouter.delete("/auth/logout",logoutUser)
authRouter.get('/user',loggerMiddleWare,getUser)
authRouter.get("/user/:id",loggerMiddleWare,RoleChackMiddleware,getUser)

export default authRouter