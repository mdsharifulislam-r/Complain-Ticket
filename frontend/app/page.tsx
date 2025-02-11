import Navbar from '@/components/common/Navbar'
import Container from '@/components/User/Container'
import React from 'react'

export default function page() {
  return (
    <div className='bg-slate-100 min-h-screen'>
      <div className="max-w-7xl mx-auto p-3">
        <Navbar/>
        <Container/>
      </div>
    </div>
  )
}
