import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Video from "../components/video"
import SEO from "../components/seo"
import { Router } from "@reach/router"

const VideoPage = () => (
  <Layout>
    {/*    <SEO title="Video" />
    <h1>Video</h1>
    <Video /> */}
    <Router>
      <Video path="/video/:title" />
    </Router>
  </Layout>
)

export default VideoPage
