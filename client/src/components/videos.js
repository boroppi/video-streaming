import React, { useEffect, useState } from "react"
import getVideos from "../api/getVideos"

import classes from "./Styles/videos.module.css"
import { Link } from "gatsby"

const Videos = () => {
  const [videos, setVideos] = useState([])
  useEffect(() => {
    getVideos(data => setVideos(data))
  }, [])
  console.log(videos)
  return (
    <div className={classes.container}>
      {videos.map(video => (
        <Link to={`/video/${video.id}`}>{video.title}</Link>
      ))}
    </div>
  )
}

export default Videos
