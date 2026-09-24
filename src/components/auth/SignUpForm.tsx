"use client"
import { createClient } from '@/utils/supabase/client';
import React, { useState } from 'react'

export default function SignUpForm() {
    const [name,setName] = useState<string> ("");
    const [email,setEmail] = useState<string> ("");
    const [password,setPassword] = useState<string> ("");
    const [error,setError] = useState<string | null>(null);

   async function handleSignUp(){
     const supabase = createClient();
     const {error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { display_name: name},
        }
     });
     if(error){
        setError(error.message);
        return;
     }
     setError("");
     setName("");
     setEmail("");
     setPassword("");
   }
  
  return (
    <div className='flex flex-col gap-2'>
        {
            error && <p className='text-red-500'>{error}</p>
        }
        <input className='border px-4 py-1' type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className='border px-4 py-1'type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input  className='border px-4 py-1' type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className='border px-2 py-1 bg-blue-500 text-white' type='button' onClick={handleSignUp}>Sign Up</button>
    </div>
  )
}
