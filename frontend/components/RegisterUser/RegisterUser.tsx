"use client"
import React, { useState } from 'react'
import InputField from '../common/InputField'
import RoleBox from './RoleBox'
import LoadingButton from '../common/LoadingButton/LoadingButton'
import { useFormik } from 'formik'
import { registerSchema } from '@/validitions/validitions'
import { otherMethod } from '@/lib/helper/postMethod'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterUser() {
    const [role,setRole]=useState("customer")
    const initialValues={
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        role:role.toUpperCase()
    }

    
    const [loading,setLoading]=useState(false)
    const router = useRouter()
    const {errors,values,handleChange,handleSubmit} = useFormik({
        initialValues,
        validationSchema:registerSchema,
        onSubmit: async (values,actiom) => {
            setLoading(true)
            const data =await otherMethod({
                url:"/auth/register",
                method:"POST",
                body:{
                    ...values,
                    role:role.toUpperCase()
                }
            })
            console.log(values);
            if(data.success){
                toast.success(data.message)
                setLoading(false)
                actiom.resetForm()
                router.push('/login')
            }else{
                toast.error(data.message)
                
                setLoading(false)
            }
        },
    })
  return (
    <>
  <div className="container mx-auto">
    <div className="flex justify-center px-6 my-12">
  
      <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-md">
   
        <div
          className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
          style={{
            backgroundImage:
              'url("https://lit5.vercel.app//l/qJU6c")'
          }}
        />
   
        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
          <div className="px-8 mb-4 text-center">
            <h3 className="pt-4 mb-2 text-2xl font-bold">Ragister <span className='text-red-500'>Now</span></h3>

          </div>
         
          <form onSubmit={handleSubmit} className="px-8  mb-4 bg-white rounded">
            <RoleBox role={role} setRole={setRole} />
            <InputField
            id="name"
            type="text"
            label="Name"
            placeholder="Your Name"
            onChange={handleChange}
            value={values.name}
            error={errors.name}
          
            />
            <InputField
            id="email"
            type="email"
            label="Email"
            placeholder="Your Email"
            onChange={handleChange}
            value={values.email}
            error={errors.email}
            />

            <InputField
            id="password"
            type="password"
            label="Password"
            placeholder="Your Password"
            onChange={handleChange}
            value={values.password}
            error={errors.password}
            />

            <InputField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            name='confirm_password'
            onChange={handleChange}
            value={values.confirm_password}
            error={errors.confirm_password}
            />
            <div className="mb-6 text-center">
              <LoadingButton
                className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                isLoading={loading}
              >
                Register
              </LoadingButton>
            </div>
            <hr className="mb-2 border-t" />
           
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="/login"
              >
                Already have an account? Login!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</>

  )
}
