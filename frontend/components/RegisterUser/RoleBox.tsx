import React from 'react'

export default function RoleBox({role,setRole}:{setRole:React.Dispatch<React.SetStateAction<string>>,role:string}) {
  return (
    <div className='py-2 flex gap-2'>
      <button onClick={()=>setRole('customer')} type='button' className={`text-xs transition-all duration-300 ${role=='customer'?"bg-red-500 text-white":"border-red-500 text-red-500"} border px-3 py-2 `}>
        Customer
      </button>
      <button onClick={()=>setRole('admin')} type='button' className={`text-xs  transition-all duration-300 ${role=='admin'?"bg-red-500 text-white":"border-red-500 text-red-500"} border px-3 py-2 `}>
        Admin
      </button>
    </div>
  )
}
