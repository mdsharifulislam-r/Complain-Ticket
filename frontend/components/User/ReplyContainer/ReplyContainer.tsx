'use client'
import React, { useEffect, useState } from 'react'
import ReplyBox from './ReplyBox'
import ReplyForm from './ReplyForm'
import { ReplyTypes } from '@/types/types'
import { useSearchParams } from 'next/navigation'
import { getMethod } from '@/lib/helper/getMethod'

export default function ReplyContainer() {
  const [replys,setReplys]=useState<ReplyTypes[]>([])

  const searchParams = useSearchParams()
  const update = searchParams.get('update')
  const ticket_id = searchParams.get("ticket_id")
  useEffect(()=>{
    const fetchReplys = async () => {
      const data = await getMethod(`/reply/${ticket_id}`, ["reply"])
      if (!data.message) {
        setReplys(data)
      }
    }
    fetchReplys()
  },[ticket_id,update])

  const shows = replys?.map(item=>{
    return <ReplyBox key={item.reply_id} content={item}/>
  })

  return (
    <div className={`md:w-[80%] w-[90%] md:ml-24 ml-8 ${replys?.length?"border-l-2":""} p-5  border-slate-300`}>
      <div className='flex flex-col gap-3'>
        {shows}
      </div>
      <ReplyForm/>
    </div>
  )
}
