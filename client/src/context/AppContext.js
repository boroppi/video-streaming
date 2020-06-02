import React, { useReducer } from "react"

const initialState = {
  homeVideos: [],
  dispatchContext: () => {},
}
export const context = React.createContext(initialState)

function AppContext({ children }) {
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "setHomeVideos": {
        return { ...state, homeVideos: payload }
      }

      default: {
        return { ...state }
      }
    }
  }

  const [state, dispatchContext] = useReducer(reducer, initialState)

  return (
    <context.Provider value={{ ...state, dispatchContext }}>
      {children}
    </context.Provider>
  )
}

export default context

export { AppContext }
