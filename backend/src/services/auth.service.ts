import prisma from "../prisma";
import { UserType } from "../types/types";

export const registerUserService = async (data:any)=>{
    try {
        const newUser = await prisma.user.create({
            data:data
        })
        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong")
    }
   
}

export const getUserDetails= async (id:number)=>{
    try {
        
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                name: true,
                email: true,
                role: true,
            }
        })
        return user
    } catch (error) {
        
        throw new Error("Something went wrong")
    }
}