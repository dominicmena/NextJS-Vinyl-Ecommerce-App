import React from 'react'
import CheckoutWizard from '../../components/CheckoutWizard'
import { Layout } from '../../components/Layout'
import { useForm } from 'react-hook-form'



export default function ShippingScreen() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        getValues,
    } = useForm()

    const submitHandler = () => {

    }

  return (
    <Layout title ='Shipping Address'>
        <CheckoutWizard activeStep={1} />
        <form 
        className='mx-auto max-w-screen-md'
        onSubmit={handleSubmit(submitHandler)}>
            <h1 className='mb-4 text-xl'>Shipping Address</h1>
            <div className='mb-4'>
            <label htmlFor='fullName'>Full Name</label>
            <input
            className='w-full'
            id='fullName'
            autoFocus
            {...register('fullName', {
                required: 'Please enter full name',
            })

            }
            />
            {errors.fullName && (
                <div className='text-red-500'>{errors.fullName.message}</div>
            )}
            </div>
            <div className='mb-4'>
                <label htmlFor='address'>Address</label>
                <input 
                className='w-full'
                id='address'
                {...register('address', {
                    required: 'Please enter address',
                    minLength: {value: 3, message: 'Address is more than 2 chars'}
                })}
                />
                {errors.address && (
                    <div className='text-red-500'>{errors.address.message}</div>
                )}
            </div>
        </form>
    </Layout>
  )
}
