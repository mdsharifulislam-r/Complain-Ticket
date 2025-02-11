'use server'
import { cookies } from "next/headers";
import { otherMethod } from "./postMethod";

export async function LogoutUser(){
    const data = await otherMethod({
        url:'/auth/logout',
        method:'DELETE',
    })
    if(data.status){
        (await cookies()).delete('token')
    }
    return data;
}