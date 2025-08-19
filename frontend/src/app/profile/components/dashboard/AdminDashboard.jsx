import Header from '@/components/Header/Header'
import { CirclePlus, ClipboardList, Hamburger, Star } from 'lucide-react'
import React from 'react'

const AdminDashboard = () => {
  return (
    <div>
      <Header/>
      <div className='max-w-screen-2xl grid grid-cols-12 h-[85vh] mt-5 rounded-2xl border-2 border-purple-800 mx-auto'>
        <div className='bg-red-400 place-items-baseline place-content-start  rounded-s-2xl'>
          <button value={'allRestaurant'} className='m-2 p-2 bg-purple-400 rounded-lg'><ClipboardList className='text-yellow-300'/></button>
          <button value={"allReview"} className='m-2 p-2 bg-purple-400 rounded-lg'><Star className='text-yellow-300'/></button>
          <button value={"famousRestaurant"} className='m-2 p-2 bg-purple-400 rounded-lg'><Hamburger className='text-yellow-300'/></button>
          <button value={'createRestaurant'} className='m-2 p-2 bg-purple-400 rounded-lg'><CirclePlus className='text-yellow-300'/></button>
        </div>
        <div className='bg-blue-300 col-span-11 rounded-e-2xl'></div>
      </div>
    </div>
  )
}

export default AdminDashboard