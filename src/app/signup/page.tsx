import AuthStatus from '@/components/auth/AuthStatus'
import SignUpForm from '@/components/auth/SignUpForm'
import React from 'react'

export default function page() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
        <h1 className='text-xl font-bold'>Sign Up</h1>
        <AuthStatus />
        <SignUpForm />
    </main>
  )
}
