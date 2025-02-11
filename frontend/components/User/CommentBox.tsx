'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { RxCross1 } from 'react-icons/rx'
import CommentStatic from './CommentBox/CommentStatic'
import CommentForm from './CommentBox/CommentForm'
import { TicketType, UserType } from '@/types/types'
import { getMethod } from '@/lib/helper/getMethod'
import { useSearchParams } from 'next/navigation'
import { otherMethod } from '@/lib/helper/postMethod'
import DeleteComplain from '../PostComplainTicket/DeleteComplain'

export default function CommentBox() {
    const [isEdit,setIsEdit]=useState(false)
    const [ticket,setTicket]=useState<TicketType>()
    const [user,setUser]=useState<UserType>()
    const [customer,setCusotmer]=useState<UserType>()
    const ticket_id =useSearchParams().get("ticket_id")
    const update = useSearchParams().get('update')


    useEffect(()=>{
        getMethod(
            `/user`,
            ["user"]
        ).then(data=>setUser(data))
        getMethod(
            `/ticket/${ticket_id}`,
            ["ticket"]
        ).then(data=>setTicket(data))
        getMethod(
            `/user/${ticket?.user_id}`,
            ["user"]
        ).then(data=>setCusotmer(data))
    },[ticket_id,update])
    

    const [hydred,setHydred]=useState(false)
    useEffect(()=>setHydred(true),[])
  return (
    <div>
 {ticket?.ticket_id && hydred?<div className='bg-gray-50 px-5 py-3 md:w-[80%] w-[90%] rounded-md'>
      <div className='flex justify-between place-items-center '>
        <h1 className='text-sm'>{customer?.name}</h1>
       {user?.role=="CUSTOMER"?<div className='flex gap-3 place-items-center'>
            <DeleteComplain ticket={ticket!}/>
            <button onClick={()=>setIsEdit(!isEdit)} className='text-indigo-500 flex text-sm place-items-center gap-2'>
                <span>
                    <BiEdit/>
                </span>
                <span>Edit</span>
            </button>
        </div>:""}
      </div>
      {isEdit?<CommentForm setIsEdit={setIsEdit} ticket={ticket!}/>:<CommentStatic role={user?.role} ticket={ticket!}/>}
    </div>:<></>}
    </div>
   
  )
}
