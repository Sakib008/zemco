'use client'

import { HandPlatter, Search } from "lucide-react"
import Link from "next/link";

const Header = () => {
  const token = false;
  return (
    <header className="h-20 max-w-screen-2xl flex items-center justify-between mx-auto px-5 rounded-full m-3 border-2 border-gray-600 ">
      <Link href={'/'} className="w-12 h-12 bg-gradient-to-br flex items-center justify-center from-purple-600 via-pink-600 to-violet-800 rounded-3xl">
        <HandPlatter className="text-white  w-8 h-8"/>
      </Link>
      <div className="flex p-2 px-3 rounded-full w-96  border-2 border-gray-500">
        <input name="search" className="outline-none text-xl w-full" type="search"/>
        <label id="search " className="cursor-pointer"><Search/></label>
      </div>
      <div className="bg-violet-800 w-12 h-12 font-bold text-2xl text-white border-2 border-gray-600 rounded-full flex items-center justify-center">{token ? <img src="" alt="" /> : <span className="">N</span>}</div>
    </header>
  )
}

export default Header