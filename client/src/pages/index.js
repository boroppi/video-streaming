import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Videos from "../components/videos"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Videos</h1>
    <p>Select a video to play.</p>
    <Videos />
  </Layout>
)

export default IndexPage
