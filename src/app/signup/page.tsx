"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import  axios from 'axios';
import toast from 'react-hot-toast/headless';

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: '',
        username: '',
    });

    const [buttonDisable, setButtonDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log(response);
            router.push('/login');
        } catch (error) {
            console.log('Failed to signup user', error); 
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
  
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            toast.success('on success')
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [user]);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? 'Processing' : 'Sign up'}</h1>

            <hr />
            <label htmlFor='username'>Username</label>
            <input 
            className='p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-gray-800'
            type='text' 
            name='username'
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder='username'
            />

            <label htmlFor='email'>Email</label>
            <input 
            className='p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-gray-800'
            type='email' 
            name='email'
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder='email'
            />

            <label htmlFor='password'>Password</label>
            <input 
            className='p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-gray-800'
            type='password' 
            name='password'
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder='password'
            />

        <button
        onClick={onSignup}
        className='p-2 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>{buttonDisable ? "No signup" : "Signup"}</button>
        <Link href='/login'>Visit login page</Link>
        </div>
    )
}