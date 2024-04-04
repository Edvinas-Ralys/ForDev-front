import { createContext, useEffect, useState, useRef } from "react"
import HomeIndex from "../Pages/LandingPage/Index"
import LoginIndex from "../Pages/Login/Index"
import SignupIndex from "../Pages/Signup/Index"
import CreatePostIndex from "../Pages/CreatePost/Index"
import ViewIndex from "../Pages/ViewPost/Index"

export const Router = createContext()
export const RouterProvider = ({ children }) => {
  const [route, setRoute] = useState(_ => {
    const hash = window.location.hash || `#home`
    return hash.split(`/`).shift()
  })

  const [params, setParams] = useState(_ => {
    const hash = window.location.hash.split(`/`)
    hash.shift(`/`)
    return hash
  })

  const possibleRoutes = [
    { path: `#home`, component: <HomeIndex /> },
    { path: `#login`, component: <LoginIndex /> },
    { path: `#signup`, component: <SignupIndex /> },
    { path: `#create-post`, component: <CreatePostIndex /> },
    { path: `#view`, component: <ViewIndex /> },
  ]

  const [errorPageType, setErrorPageType] = useState(null)

  const [loading, setLoading] = useState(false)

  useEffect(_ => {
    const handleRouteChange = _ => {
      const hash = window.location.hash.split(`/`)
      setRoute(hash.shift())
      setParams(hash)
    }
    window.addEventListener(`hashchange`, handleRouteChange)
    return _ => window.removeEventListener(`hashchange`, handleRouteChange)
  }, [])

  const currentComponent = possibleRoutes.find(r => r.path === route)?.component || `Error page`
  //   const errorComponent = errorPages.find(e => e.type === errorPageType)?.component || null

  const windowWidth = 1920
  const squareSize = 40
  const [gridSize, setGrindSize] = useState(_ => {
    return (
      Math.floor(windowWidth / squareSize) * Math.floor((window.innerHeight - 250) / squareSize)
    )
  })

  // const bgContainer = useRef()
  // useEffect(
  //   _ => {
  //     for (let i = 0; i < gridSize; i++) {
  //       const square = document.createElement(`div`)
  //       square.className = `square`
  //       square.style.width = `${windowWidth / squareSize}px`
  //       square.style.height = `${windowWidth / squareSize}px`
  //       bgContainer?.current.appendChild(square)
  //     }
  //   },
  //   [bgContainer, window]
  // )

  return (
    <Router.Provider
      value={{ params, route, setErrorPageType, setLoading, loading, setParams, setRoute }}
    >
      <>{currentComponent}</>
    </Router.Provider>
  )
}
