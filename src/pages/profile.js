import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Layout } from '../../components/Layout'
import { getError } from '../../utils/error'

export default function ProfileScreen() {
    const { data: session } = useSession()

const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
} = useForm()

useEffect(() => {
    setValue('name', session.user.name)
    setValue('email', session.user.email)
}, [session.user, setValue])

const submitHandler = async ({name, email, password, confirmPassword}) => {
    try {
        await axios.put('/api/auth/update', {
            name,
            email,
            password,
        });
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        })

        toast.success('Profile updated successfully')

        if (result.error) {
            toast.error(result.error)
        }
    } catch (err) {
        toast.error(getError(err))
    }
 }

  return (
   <Layout title= 'Profile'>
    <form 
    className='mx-auto max-w-screen-md'
    onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Update Profile</h1>
        <div className='mb-4'>
            <label htmlFor='name'>Name</label>
            <input
            type='name'
            className='w-full'
            id='name'
            autoFocus
            {...register('name', {
                required: 'Please enter name',
            })}
            />
            {errors.name && (
                <div className='text-red-500'>{errors.name.message}</div>
            )}
        </div>
    </form>
    </Layout>
  )
}
