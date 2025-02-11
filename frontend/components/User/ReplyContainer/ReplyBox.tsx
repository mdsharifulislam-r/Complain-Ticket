import { ReplyTypes } from '@/types/types'
import React from 'react'

export default function ReplyBox({content}:{content:ReplyTypes}) {
  return (
    <div className='bg-gray-50 p-5 rounded-md w-[80%] '>
      <p className='text-sm text-slate-600'>
       {content?.content}
      </p>
    </div>
  )
}
