import React from 'react'
import CommentBox from './CommentBox'
import ReplyContainer from './ReplyContainer/ReplyContainer'

export default function CommentContainer() {
   
  return (
    <div className='w-full bg-white min-h-screen rounded-md p-5'>
      <h1 className='text-slate-500'>ALl Replys from admin</h1>
      <div className="mt-5">
        <CommentBox/>
        <ReplyContainer/>
      </div>
    </div>
  )
}
