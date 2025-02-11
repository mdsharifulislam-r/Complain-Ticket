import { body } from "express-validator"

export const registerValidation:()=>any = ()=>{
    return [
    body("name").isString().withMessage("name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("confirm_password").custom((value, { req }) => value === req.body.password).withMessage("Passwords do not match"),
    ]
}

export const loginValidation:()=>any = ()=>{
    return [
    body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ]
}

export const createTicketValidation:()=>any = ()=>{
    return [
    body("subject").isString().withMessage("Subject is required"),
    body("description").isString().withMessage("Description is required"),
    ]
}

export const updateTicketValidation:()=>any = ()=>{
    return [
    body("status").isIn(["OPEN", "CLOSED","RESOLVED"]).withMessage("Status must be either 'open' or 'closed'"),
    ]
}

export const giveCommentValidation:()=>any = ()=>{
    return [
    body("content").isString().notEmpty().withMessage("Comment is required"),
    body("ticket_id").notEmpty().isNumeric().withMessage("Ticket is required")
    ]
}