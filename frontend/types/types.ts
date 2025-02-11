export interface UserType{
    id?: number;
    name: string;
    email: string;
    password:string
    role?: "CUSTOMER"|"ADMIN",
    confirm_password?:string
}

export interface TicketType{
    ticket_id?:number,
    subject:string,
    description: string,
    user_id: number,
    status?: "open"|"closed"|"resolved",
    created_at:string,
}

export interface ReplyTypes{
    ticket_id:number,
    admin_id:number,
    content:string,
    created_at?:string,
    reply_id?:number
}