"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function otherMethod(props:{url:string,method:"POST"|"PUT"|"DELETE",body?:any,validationTag?:string}) {
    try {
        const token = (await cookies()).get('token')?.value
        console.log(token)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${props.url}`,{
            method:props.method,
            headers:{
                "Content-Type":"application/json",
                authorization: `${token}`,
                'Cookie':`token=${token}`
            },
            credentials:"include",
            body:JSON.stringify(props.body),
        })

        revalidateTag(props.validationTag||"")

        const data = await res.json()

        return data
    } catch (error) {
        
    }
}