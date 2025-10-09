import { useAuth } from '@/context/authContext'
import React from 'react'

const LogoutPromise = ({open,setOpen}) => {
    const {logoutUser} = useAuth()
    if(!open) return null
  return (
    <div className='fixed p-4 inset-0 bg-white flex flex-col items-center justify-center z-10'>
        <h1 className='text-2xl font-bold'>Are you sure you want to logout?</h1>
        <div className='flex gap-2 mt-4 justify-between items-center'>
            <button onClick={() => setOpen(false)} className='bg-red-500 w-20 p-2 rounded-lg'>
                No
            </button>
            <button onClick={logoutUser} className='bg-green-500 w-20 p-2 rounded-lg'>
                Yes
            </button>
        </div>
    </div>
  )
}

export default LogoutPromise