import React, { Suspense } from 'react'
import Sidebar from './Sidebar'
import CommentContainer from './CommentContainer'

export default function Container() {
  return (
    <div className='flex gap-3'>
      <Suspense>
      <Sidebar/>
      </Suspense>
      
      <div className='w-[70%] md:block hidden'>
        <Suspense>
        <CommentContainer/>
        </Suspense>
      
      </div>
      
    </div>
  )
}
