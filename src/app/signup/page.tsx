'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function SignUpPage() {
   const router = useRouter()
   const [user, setUser] = useState({ email: '', password: '', username: '' })

   const [buttonDisabled, setButtonDisabled] = useState(false)
   const [loading, setLoading] = useState(false)

   const onSignUp = async () => {
      try {
         setLoading(true)
         const res = await axios.post('/api/users/singup', user)
         console.log('Sign Up Success: ', res.data)
         router.push('/login')
      } catch (err: any) {
         console.log('Sing Up Failed: ', err.message)
         toast.error(err.message)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      if (user.email.length && user.password.length && user.username.length) {
         setButtonDisabled(false)
      } else {
         setButtonDisabled(true)
      }
   }, [user])

   return (
      <div className='flex flex-col items-center justify-center h-screen'>
         <h1 className='text-center text-white text-2xl'>{loading ? 'Processing' : 'Sign Up'}</h1>
         <hr className='mb-4' />
         <label htmlFor='username'>Username</label>
         <input
            id='username'
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-900'
            type='text'
            name='username'
            value={user.username}
            placeholder='Username...'
            onChange={e => setUser({ ...user, username: e.target.value })}
         />
         <label htmlFor='email'>Email</label>
         <input
            id='email'
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-900'
            type='email'
            name='email'
            value={user.email}
            placeholder='Email...'
            onChange={e => setUser({ ...user, email: e.target.value })}
         />
         <label htmlFor='password'>Password</label>
         <input
            id='password'
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-900'
            type='password'
            name='password'
            value={user.password}
            placeholder='Password...'
            onChange={e => setUser({ ...user, password: e.target.value })}
         />
         <button
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            onClick={onSignUp}
            disabled={buttonDisabled}
         >
            {buttonDisabled ? 'No Sign Up' : 'Sign Up'}
         </button>

         <Link href='/login'>Visit login page</Link>
      </div>
   )
}

export default SignUpPage
