import React, { useEffect, useContext } from "react"
import Context from "../context/AppContext"
import getVideos from "../api/getVideos"
import slugify from "slugify"
import classes from "./Styles/videos.module.css"
import { Link } from "gatsby"

const Videos = () => {
  const { dispatchContext, homeVideos } = useContext(Context)

  useEffect(() => {
    dispatchContext({ type: "setSelectedNavBar", payload: "home" })
    if (homeVideos.length === 0) {
      getVideos(value =>
        dispatchContext({ type: "setHomeVideos", payload: value })
      )
    }
  }, [])

  return (
    <div className={classes.container}>
      {homeVideos.map(video => (
        <Link to={`/video/${slugify(video.title, { lower: true })}`}>
          {video.title}
        </Link>
      ))}
    </div>
  )
}

export default Videos
