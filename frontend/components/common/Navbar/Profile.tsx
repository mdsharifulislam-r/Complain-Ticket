import { getMethod } from '@/lib/helper/getMethod'
import { UserType } from '@/types/types'
import Image from 'next/image'
import React from 'react'

export default async function Profile() {
  const user:UserType = await getMethod(
    '/user',
    ['user']
  )
  return (
    <div className='flex  place-items-center gap-2'>
        <Image src="https://lit5.vercel.app//l/lNIqE" alt="Profile Pic" width={50} height={50} />
      <div>
        <h1 className='text-xl'>{user?.name}</h1>
        <p className='text-sm text-gray-500'>As a {user?.role}</p>
      </div>

    </div>
  )
}
