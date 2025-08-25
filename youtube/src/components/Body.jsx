import React from 'react'
import Navbar from './Navbar'
import VideoContainer from './VideoContainer'
import { useSelector } from 'react-redux'

const Body = () => {
  const navState = useSelector(store=>store.navBarStatus.navBarStatus)
  return (
    <div className='flex h-full'>
    {navState && <Navbar/>}
    <VideoContainer/>
    </div>
  )
}

export default Body