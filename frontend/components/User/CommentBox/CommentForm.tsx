'use client'
import InputField from '@/components/common/InputField'
import LoadingButton from '@/components/common/LoadingButton/LoadingButton'
import { otherMethod } from '@/lib/helper/postMethod'
import { TicketType } from '@/types/types'
import { ticketSchema } from '@/validitions/validitions'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function CommentForm({ticket,setIsEdit}:{ticket:TicketType,setIsEdit:React.Dispatch<React.SetStateAction<boolean>>}) {

    const initialValues={
        subject:ticket?.subject,
        description:ticket?.description
    }
    const [loading,setLoading]=useState(false)
    const router = useRouter()
    const {errors,values,handleChange,handleSubmit} = useFormik({
        initialValues,
        validationSchema:ticketSchema,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true)
            const data = await otherMethod({
                url: `/ticket/${ticket?.ticket_id}`,
                method: 'PUT',
                body: values,
                validationTag:"ticket"
            })
          
            
            if(data.ticket){
                toast.success('Ticket updated successfully')
                setLoading(false)
                setIsEdit(false)
                router.push(`?update=${values.subject}&ticket_id=${ticket?.ticket_id}`)
            }else{
                toast.error('Failed to update ticket')
                setLoading(false)
            }
        }
    })


  return (
    <form onSubmit={handleSubmit} className='mt-3'>
      <InputField
      name='subject'
    value={values.subject}
    onChange={handleChange}
      error={errors.subject}
      />
      <textarea name='description' value={values.description} onChange={handleChange} rows={5} className='p-3 w-full rounded-md focus:outline-none'  placeholder='Write a comment...'></textarea>
      <div className='flex justify-end mt-2'>
        <LoadingButton isLoading={loading} className='text-white bg-blue-500 hover:bg-blue-700 px-3 text-sm py-2 rounded-md'>Update</LoadingButton>
      </div>
    </form>
  )
}
