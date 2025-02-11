import CommentContainer from '@/components/User/CommentContainer'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <div className='p-5 bg-gray-50'>
      <Suspense>
      <CommentContainer/>
      </Suspense>
      
    </div>
  )
}
