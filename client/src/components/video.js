import React, { useEffect, useState } from "react"
import getVideo from "../api/getVideo"
import ReactPlayer from "react-player"

import classes from "./Styles/video.module.css"

const Video = ({ id }) => {
  const [video, setVideo] = useState(null)

  /*  useEffect(() => {
    getVideo(id, data => setVideo(data))
  }, []) */

  return (
    <div className={classes.container}>
      <ReactPlayer
        url={`${process.env.API_URL}/videos/${id}`}
        playing={true}
        controls={true}
      />
    </div>
  )
}

export default Video
