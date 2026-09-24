'use client'
import { createClient } from '@/utils/supabase/client';
import React, { useState } from 'react'

export default function SignOutButton() {
    const [error, setError] = useState('');
    
    async function handleSignOut(){
        const supabase = createClient();
        const {error} = await supabase.auth.signOut();
        if(error){
            setError(error.message);
            return;
        }
        setError('');
    }

  return (
    <div>
        <button type='button' className='border px-4 py-1 bg-blue-500 text-white' onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}
