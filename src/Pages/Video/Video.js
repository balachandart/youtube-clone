import React from 'react'
import './Video.css'
import { useParams } from 'react-router-dom'
import Playvideo from '../../Components/Playvideo/Playvideo'
import Recommended from '../../Components/Recommended/Recommended'
const Video = () => {
  const {videoId,categoryId}=useParams();
  return (
    <div className='Play-container'>
      <Playvideo videoId={videoId} categoryId={categoryId}/>
      <Recommended categoryId={categoryId}/>
    </div>
  )
}

export default Video