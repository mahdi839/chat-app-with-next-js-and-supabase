'use client'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SignInForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    async function handleSignIn(){
        const supabase = createClient();
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(error){
            setError(error.message);
            return;
        }
        setError('');
        setEmail('');
        setPassword('');
        router.push("/")
    }
  return (
    <div>
        {error && <p className='text-red-500'>{error}</p>}  
        <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} className='border px-4 py-1' placeholder='Email' />
        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='border px-4 py-1' placeholder='Password' />
        <button type='button' onClick={handleSignIn} className='border px-4 py-1 bg-blue-500 text-white'>Sign In</button>
    </div>
  )
}
