import React from 'react'
import { Link } from 'react-router-dom'

const VideoCard = ({ video }) => {
  return (
    <Link to={`/streamVideo?id=${video.id}`}>
      <div className=' w-50 border border-gray-400 m-2 shadow-lg rounded-2xl flex flex-col'>
        <img loading='lazy' src={video.snippet.thumbnails.default.url} alt="img" className=' rounded-t-2xl m-2' />
        <h3 className='text-sm font-semibold m-2'>{video.snippet.title}</h3>
        <p className='text-xs text-gray-500 m-2'>{video.snippet.channelTitle}</p>

      </div></Link>
  )
}

export default VideoCard