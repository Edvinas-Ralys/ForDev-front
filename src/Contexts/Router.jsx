import { createContext, useEffect, useState } from "react"
import HomeIndex from "../Pages/LandingPage/Index"


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

  const possibleRoutes = [{ path: `#home`, component: <HomeIndex /> }]

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

  return (
    <Router.Provider
      value={{ params, route, setErrorPageType, setLoading, loading, setParams, setRoute }}
    >
      {currentComponent}
    </Router.Provider>
  )
}
