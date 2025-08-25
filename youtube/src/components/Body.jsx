import React from 'react'
import Navbar from './Navbar'
import VideoContainer from './VideoContainer'

const Body = () => {
  return (
    <div className='flex h-full'>
    <Navbar/>
    <VideoContainer/>
    </div>
  )
}

export default Body