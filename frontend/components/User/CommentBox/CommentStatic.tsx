import { otherMethod } from '@/lib/helper/postMethod';
import { TicketType } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent } from 'react'
import toast from 'react-hot-toast';
import { IoArrowUndo } from "react-icons/io5";
const options = ["open","resolved","closed"]
export default function CommentStatic({ticket,role}:{ticket:TicketType,role:any}) {

    const router = useRouter()

    const changeStatus = async (e:ChangeEvent<HTMLSelectElement>)=>{
        const value = e.target.value
       
       const data= await otherMethod({
            url:`/ticket/update/${ticket?.ticket_id}`,
            method:'PUT',
            body:{status:value.toUpperCase()}
        })
       
        if(data){
            toast.success('Ticket status updated successfully')
            router.push(`?update=${value}&ticket_id=${ticket?.ticket_id}`)
        }
        
    }

  return (
    <div className='mt-3'>
      <h1 className='text-xl'>{ticket?.subject}</h1>
      <p className='text-gray-600 text-sm mt-2 text-wrap'>{ticket?.description}</p>
     {role=="ADMIN"?<div className='flex gap-3 place-items-center mt-3'>
        <select name="" onChange={changeStatus} id="" value={ticket?.status?.toLowerCase()} className='text-sm bg-transparent'>
            <option value="" disabled >Status</option>
            {
                options.map(option => (
                    <option key={option}  className={`${option=='open'?"!text-green-500":option=="resloved"?"!text-indigo-500":"!text-red-500"}`} value={option}>{option}</option>
                ))
            }
        </select>

        <label htmlFor='reply' className='text-indigo-500 cursor-pointer text-sm flex place-items-center gap-2'>
            <span>
                <IoArrowUndo/>
            </span>
            <span>Reply</span>

        </label>
        
      </div>:""}
    </div>
  )
}
