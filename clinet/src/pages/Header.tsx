import React from 'react'
import { Link } from 'react-router-dom'
import logo from "@/assets/logo.png"
export default function Header() {
  return (
    <div className='border-b-1 rounded-2xl text-white h-20 overflow-hidden flex shadow-xs'>
        <div className=' w-10/12 h-auto m-auto flex justify-between items-center'>
            <div className='w-18 '><img src={logo} alt="logo" /></div>
            <div className=' flex gap-12'>
                <Link to={"/"}>Home</Link>
                <Link to={"/"}>service</Link>
                <Link to={"/"}>About</Link>
                <Link to={"/"}>Classes</Link>
            </div>
            <div>
              
            </div>
        </div>
    </div>
  )
}
