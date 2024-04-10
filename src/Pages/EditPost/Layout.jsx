import React, { useContext, useState, useEffect } from "react"
import Preview from "../CreatePost/Preview"
import { Authorization } from "../../Contexts/Authorization"
import { Router } from "../../Contexts/Router"
import NavigationUser from "../Components/NavigationUser"
import Navigation from "../Components/Navigation"
import Edit from "./Edit"

function Layout() {
  const { user } = useContext(Authorization)
  const [preview, setPreview] = useState(null)
  const { params } = useContext(Router)
  const [offset, setOffset] = useState(false)

  useEffect(_ => {
    window.onscroll = _ => {
      if (window.scrollY > 0) {
        setOffset(true)
      } else {
        setOffset(false)
      }
    }
  }, [])

  if (!user) {
    return (window.location.href = `#login`)
  }

  return (
    <div className="create-main">
      {user ? <NavigationUser offset={offset}/> : <Navigation offset={offset} />}
      {/* <SideNavUser preview={preview} setPreview={setPreview}/> */}
      {preview && params[0] === `preview` ? (
        <Preview preview={preview} setPreview={setPreview} />
      ) : (
        <Edit setPreview={setPreview} />
      )}
    </div>
  )
}

export default Layout
