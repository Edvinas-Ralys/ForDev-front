import { createContext, useEffect, useState } from "react"
import HomeIndex from "../Pages/LandingPage/Index"
import LoginIndex from "../Pages/Login/Index"
import SignupIndex from "../Pages/Signup/Index"
import CreatePostIndex from "../Pages/CreatePost/Index"
import ViewIndex from "../Pages/ViewPost/Index"
import Page500 from "../Pages/Err/Page500"
import NetworkErr from "../Pages/Err/NetworkErr"
import Page403 from "../Pages/Err/Page403"
import Page401 from "../Pages/Err/Page401"
import ProfileIndex from "../Pages/Profile/Index"
import SearchIndex from "../Pages/Search/Index"
import EditIndex from "../Pages/EditPost/Index"

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
    { path: `#profile`, component: <ProfileIndex /> },
    { path: `#search`, component: <SearchIndex /> },
    { path: `#edit-post`, component: <EditIndex /> },
    { path: `#network-err`, component: <NetworkErr /> },
  ]

  const errorPages = [
    { type: 500, component: <Page500 /> },
    { type: `network_err`, component: <NetworkErr /> },
    { type: 403, component: <Page403 /> },
    { type: 401, component: <Page401 /> },
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

  const currentComponent = possibleRoutes.find(r => r.path === route)?.component || <NetworkErr />
  const errorComponent = errorPages.find(e => e.type === errorPageType)?.component || null

  return (
    <Router.Provider
      value={{ params, route, setErrorPageType, setLoading, loading, setParams, setRoute }}
    >
      <>{errorComponent || currentComponent}</>
    </Router.Provider>
  )
}
