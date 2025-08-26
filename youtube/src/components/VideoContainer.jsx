import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'

const VideoContainer = () => {
  const [ videos, setVideos] = useState([])
  useEffect(() => {
    fetchVideosData();
  }, []);

  const fetchVideosData = async()=>{
// filepath: c:\documents\youtube\youtube\src\components\VideoContainer.jsx
const response  = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=${import.meta.env.VITE_YOUTUBE_API_TOKEN}&maxResults=25`);
    const data = await response.json();
    setVideos(data.items);
    console.log(data.items);
  }

  return (
    <div className='flex-9 border border-gray-400 flex flex-wrap overflow-y-scroll justify-center'>{
      videos.map(video=>{
        return(
          <VideoCard key={video.id} video={video}/>
        )
      })
    }</div>
  )
}

export default VideoContainer