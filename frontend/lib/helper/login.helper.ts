"use server"

import { cookies } from "next/headers"

export async function loginUser(values:any) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
            credentials:"include"
        })
        
        const data = await res.json()
        if(data.token){
            (await cookies()).set('token',data.token,{
                secure:false,
                sameSite: 'none',
                path:'/',
                expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
                httpOnly: true,
                domain: "localhost",
            })
        }
        return data
    } catch (error) {
        console.log(error);
        
    }
}