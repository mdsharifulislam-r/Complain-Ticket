import React from 'react'
import Sidebar from './Sidebar'
import CommentContainer from './CommentContainer'

export default function Container() {
  return (
    <div className='flex gap-3'>
      <Sidebar/>
      <div className='w-[70%] md:block hidden'>
      <CommentContainer/>
      </div>
      
    </div>
  )
}
