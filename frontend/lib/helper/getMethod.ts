"use server"

import { cookies } from "next/headers"

export async function getMethod(url:string,revalidateTags?:string[]) {
    try {
        const token = (await cookies()).get('token')?.value
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                authorization: `${token}`,
                'Cookie':`token=${token}`
            },
            credentials:"include",
            next:{
                tags:revalidateTags||[]
            }
        })

        const data = await res.json()

        return data
    } catch (error) {
        
    }
}