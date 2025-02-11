'use client'
import PostComplainTicket from '@/components/PostComplainTicket/PostComplainTicket'
import { getMethod } from '@/lib/helper/getMethod'
import { LogoutUser } from '@/lib/helper/logout'
import { otherMethod } from '@/lib/helper/postMethod'
import { UserType } from '@/types/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Buttons() {
    const router = useRouter()
    const logoutUser= async ()=>{
        const data = await LogoutUser()
        if(data.status){
            router.push('/login')
            toast.success("Logged out successfully")
        }else{
            toast.error(data.message)
        }
    }
    const [user,setUser]=useState<UserType>()
    useEffect(()=>{
      getMethod(
        `/user`,
        ["user"]
      ).then(data=>setUser(data))
    },[])
  return (
    <div className='flex place-items-center gap-3'>
     {user?.role=='CUSTOMER'? <PostComplainTicket/>:""}
      <button onClick={logoutUser} className='px-3 py-2 bg-red-500 text-white rounded-md text-sm'>
        Logout
      </button>
    </div>
  )
}
