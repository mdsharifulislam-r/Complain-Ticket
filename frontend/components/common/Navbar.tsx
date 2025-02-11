import React from 'react'
import Profile from './Navbar/Profile'
import Buttons from './Navbar/Buttons'

export default function Navbar() {
  return (
    <div className='w-full my-4 flex justify-between place-items-center bg-white p-4 rounded-md'>
      <Profile/>
      <Buttons/>
    </div>
  )
}
