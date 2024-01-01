'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface User {
   _id: string
   username: string
   email: string
}

function ProfilePage() {
   const router = useRouter()
   const [data, setData] = useState<User | null>(null)

   const logout = async () => {
      try {
         const res = await axios.get('/api/users/logout')
         console.log('Logout Success: ', res.data)
         toast.success('Logout Success')
         router.push('/login')
      } catch (err: any) {
         console.log('Logout Failed: ', err.message)
         toast.error(err.message)
      }
   }

   const getUserDetail = async () => {
      const res = await axios.get('/api/users/me')
      console.log('User Detail: ', res.data)
      setData(res.data.user)
   }

   return (
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
         <h1>Profile</h1>
         <hr />
         <p>Profile page</p>
         <h2 className='p-3 mt-2 rounded bg-green-500'>
            {!data ? 'Nothing here' : <Link href={`/profile/${data._id}`}>{data.email}</Link>}
         </h2>

         <hr />

         <button
            className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={logout}
         >
            Logout
         </button>
         <button
            className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={getUserDetail}
         >
            Get User Detail
         </button>
      </div>
   )
}

export default ProfilePage
