'use client'
import LoadingButton from '@/components/common/LoadingButton/LoadingButton'
import { otherMethod } from '@/lib/helper/postMethod'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'

export default function ReplyForm() {
    const [content,setContent]=useState("")
    const [loading, setLoading] = useState(false)
    const ticket_id=useSearchParams().get('ticket_id')
    const router = useRouter()
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const data = await otherMethod({
            url: `/reply`,
            method: 'POST',
            body: {content,ticket_id:parseInt(ticket_id!)},
            validationTag:"reply"
        })
        
        if(data){
            setContent("")
            setLoading(false)
            router.push(`?update=true&ticket_id=${ticket_id}`)
        }
    }

  return (
    <div className='mt-4'>
      <input type="checkbox" name="" hidden id="reply" className='peer/form' />
      <form onSubmit={handleSubmit} action="" className=' peer-checked/form:block hidden'>
        <label htmlFor="reply" className='text-sm text-slate-500 pb-2'>Reply:</label>
        <textarea onChange={(e)=>setContent(e.target.value)} value={content} id="reply" name="reply" rows={4} className='w-full p-4 text-sm text-slate-500 border rounded-md focus:outline-none' ></textarea>
        <LoadingButton isLoading={loading} className='px-4 py-2 bg-indigo-500 text-white rounded-md mt-4 text-sm'>Submit</LoadingButton>
      </form>
    </div>
  )
}
