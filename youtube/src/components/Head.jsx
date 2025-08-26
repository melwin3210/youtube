import React from 'react'
import { useDispatch } from 'react-redux'
import { updateNavStatus } from '../store/slices/navBarSlice'
import { Route, useNavigate } from 'react-router-dom'

const Head = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className='flex w-full border border-gray-400 h-16 shadow-lg'>
        <img onClick={()=>dispatch(updateNavStatus())}  className="p-2 cursor-pointer"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-cwMeLLj8MfIo3HoXJKFcOFB1g9U4DDMHA&s" alt="menu-con" />
        <img onClick={()=>navigate('/')} className='flex-1 p-2 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1280px-Logo_of_YouTube_%282015-2017%29.svg.png" alt="logo" />
        <div className='flex flex-9'>
            <input type="text" placeholder='Search' className='w-1/2 border border-gray-400 rounded-lg p-2 m-2'/>
            <button className='bg-red-500 text-white rounded-lg p-2 m-2'>Search</button>
        </div>
        <div className='flex justify-between flex-1'>
            <button className='bg-red-500 text-white rounded-lg p-2 m-2'>Sign In</button>
        </div>
    </div>
  )
}

export default Head