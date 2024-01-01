'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function LoginPage() {
   const router = useRouter()
   const [user, setUser] = useState({ email: '', password: '' })

   const [buttonDisabled, setButtonDisabled] = useState(false)
   const [loading, setLoading] = useState(false)

   const onLogin = async () => {
      try {
         setLoading(true)
         const res = await axios.post('/api/users/login', user)
         console.log('Login Success: ', res.data)
         toast.success('Login Success')
         router.push('/profile')
      } catch (err: any) {
         console.log('Login Failed: ', err.message)
         toast.error(err.message)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      if (user.email.length && user.password.length) {
         setButtonDisabled(false)
      } else {
         setButtonDisabled(true)
      }
   }, [user])

   return (
      <div className='flex flex-col items-center justify-center h-screen'>
         <h1 className='text-center text-white text-2xl'>{loading ? 'Processing' : 'Login'}</h1>

         <hr className='mb-4' />
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
            onClick={onLogin}
         >
            {buttonDisabled ? 'No Login' : 'Login'}
         </button>

         <Link href='/signup'>Visit sing up page</Link>
      </div>
   )
}

export default LoginPage
