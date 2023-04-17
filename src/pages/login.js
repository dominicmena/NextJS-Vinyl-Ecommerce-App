import Link from "next/link";
import React from "react";
import { Layout } from "../../components/Layout";
import { useForm } from "react-hook-form";
import {signIn, useSession} from 'next-auth/react'
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginScreen() {

    const { data: session } = useSession();

    const router = useRouter()
    const { redirect } = router.query
    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/')
        }
    }, [router, session, redirect ])


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })
        if (result.error) {
            toast.error(result.error)
        }
    } catch(err) {
        toast.error(getError(err))
    }
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", { required: "Please enter email", 
        pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
            message: 'Please enter valid email address',
        }
        })}
            className="w-full border-2 border-black"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
                required: 'Please enter password',
                minLength: { value: 6, message: 'password is more than 5 chars'},
            })}
            className="w-full border-2 border-black"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`}>Register</Link>
        </div>
      </form>
    </Layout>
  );
}

// This code defines a login screen component for a web application. It uses the useSession hook from the Next.js authentication library to check if the user is already logged in, and redirects them to the home page if they are. If the user is not logged in, it displays a login form with email and password input fields, and validation rules for the input fields. The form data is submitted using the signIn function from the Next.js authentication library, and the result is checked for errors. If there are errors, a toast notification is displayed. If the user doesn't have an account, they can register by clicking the link at the bottom of the form.
