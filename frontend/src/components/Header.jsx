'use client'

import { HandPlatter, Search, LogOut } from "lucide-react"
import Link from "next/link";
import { useAuth } from "@/context/authContext";

const Header = () => {
  const { isAuthenticated, user, logoutUser } = useAuth();
  
  return (
    <header className="h-20 max-w-screen-2xl flex items-center justify-between mx-auto px-5 rounded-full m-3 border-2 border-gray-600 ">
      <Link href={'/'} className="w-12 h-12 bg-gradient-to-br flex items-center justify-center from-purple-600 via-pink-600 to-violet-800 rounded-3xl">
        <HandPlatter className="text-white  w-8 h-8"/>
      </Link>
      <div className="flex p-2 px-3 rounded-full w-96  border-2 border-gray-500">
        <input name="search" className="outline-none text-xl w-full" type="search"/>
        <label id="search " className="cursor-pointer"><Search/></label>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link href={'/profile'} className="bg-violet-800 w-12 h-12 font-bold text-2xl text-white border-2 border-gray-600 rounded-full flex items-center justify-center">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </Link>
            <button 
              onClick={logoutUser}
              className="bg-red-600 w-12 h-12 text-white border-2 border-gray-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </>
        ) : (
          <Link href={'/login'} className="bg-violet-800 px-6 py-2 font-bold text-white border-2 border-gray-600 rounded-full hover:bg-violet-700 transition-colors">
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header