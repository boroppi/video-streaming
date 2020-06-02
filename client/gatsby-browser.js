import React from "react"
import { AppContext } from "./src/context/AppContext"

export const wrapRootElement = ({ element }) => {
  return <AppContext>{element}</AppContext>
}
