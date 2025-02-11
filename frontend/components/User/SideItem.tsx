import { TicketType } from '@/types/types'
import Link from 'next/link'
import React from 'react'

export default function SideItem({ticket}:{ticket:TicketType}) {
    const status = ticket?.status?.toLowerCase()
  return (
    <>
     <Link href={`?ticket_id=${ticket?.ticket_id}`} className='w-full md:block px-3 py-3 hidden bg-gray-100 overflow-hidden rounded-md'>
      <div className='flex justify-between place-items-center'>
      <h1 className='text-base'>{ticket?.subject}</h1>
      <span className={`${status=='open'?"text-green-300 bg-green-500":status=='resolved'?"bg-indigo-500 text-indigo-300":"text-red-300 bg-red-500 "} rounded-md p-1 text-sm`}>
        {ticket?.status?.toLowerCase()}
      </span>
      </div>
      <p className=' line-clamp-1 text-xs'>{ticket?.description}</p>
    </Link>
    <Link href={`/small?ticket_id=${ticket?.ticket_id}`} className='w-full md:hidden  px-3 py-3 block bg-gray-100 overflow-hidden rounded-md'>
      <div className='flex justify-between place-items-center'>
      <h1 className='text-base'>{ticket?.subject}</h1>
      <span className={`${status=='open'?"text-green-300 bg-green-500":status=='resolved'?"bg-indigo-500 text-indigo-300":"text-red-300 bg-red-500 "} rounded-md p-1 text-sm`}>
        {ticket?.status?.toLowerCase()}
      </span>
      </div>
      <p className=' line-clamp-1 text-xs'>{ticket?.description}</p>
    </Link>
    </>
   
  )
}
