import React, { useEffect, useState } from "react"
import getVideo from "../api/getVideo"
import ReactPlayer from "react-player"

import classes from "./Styles/video.module.css"

const Video = ({ title }) => {
  return (
    <div className={classes.container}>
      <ReactPlayer
        url={`${process.env.API_URL}/videos/${title}`}
        playing={true}
        controls={true}
      />
    </div>
  )
}

export default Video
