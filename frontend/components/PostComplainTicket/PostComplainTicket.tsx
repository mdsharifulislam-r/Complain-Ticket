"use client"
import React, { useState } from 'react'
import InputField from '../common/InputField'
import { useFormik } from 'formik'
import { ticketSchema } from '@/validitions/validitions'
import { otherMethod } from '@/lib/helper/postMethod'
import toast from 'react-hot-toast'
import LoadingButton from '../common/LoadingButton/LoadingButton'
import { useRouter } from 'next/navigation'


export default function PostComplainTicket() {
    const initialValues={
        subject: '',
        description: ''
    }
    const [loading,setLoading]=useState(false)
    const router = useRouter()

    const {errors,values,handleChange,handleSubmit} = useFormik({
        initialValues,
        validationSchema: ticketSchema,
        onSubmit: async (values, { resetForm }) => {
                setLoading(true)
                const data = await otherMethod({
                    url: '/ticket',
                    method: 'POST',
                    body: values,
                    validationTag:"ticket"
                })
                console.log(data);
                
                if(data.ticket){

                    toast.success('Ticket posted successfully')
                    resetForm()
                    setLoading(false)
                    router.push(`?update=${data.ticket.ticket_id}`)
                }else{
                    toast.error('Failed to post ticket')
                    setLoading(false)
                }
        },
  
    })
  return (
    <form onSubmit={handleSubmit}>
 
 <label htmlFor='post-ticket' className='px-3 py-2 cursor-pointer bg-indigo-500 text-white rounded-md text-sm'>
        Post a Complaint
      </label>

<input type="checkbox" id="post-ticket" className="modal-toggle" />
<div className="modal" role="dialog">

  <div className="modal-box">
    <h1 className='text-xl mb-2'>Post a Ticket</h1>
    <InputField
    label='Subject'
    placeholder='Subject'
    name='subject'
    onChange={handleChange}
    value={values.subject}
    error={errors.subject}

    />
    <textarea
      className='w-full px-3 py-2 mt-2 border focus:outline-none rounded-md '
      name='description'
      rows={5}
      placeholder='Description'
      onChange={handleChange}
      value={values.description}
   
    />
    <div className="modal-action">
        <LoadingButton isLoading={loading} className='btn btn-primary'>Submit</LoadingButton>
      
      <label htmlFor="post-ticket" className="btn">Close!</label>
    </div>
  </div>
</div>
    </form>
  )
}
