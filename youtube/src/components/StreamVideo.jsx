import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { closeNavBar } from '../store/slices/navBarSlice';

const StreamVideo = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(closeNavBar())

  },[])
  const videoId = params.get('id');
  return (
    <div className='h-full flex justify-center m-2'>
      <iframe
        width="700"
        height="400"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default StreamVideo