import React, { useContext, useState } from "react"
import Create from "./Create"
import Preview from "./Preview"
import { Authorization } from "../../Contexts/Authorization"
import { Router } from "../../Contexts/Router"
import SideNavUser from "../Components/SideNavUser"

function Layout() {
  const { user } = useContext(Authorization)
  const [preview, setPreview] = useState(null)
  const { params } = useContext(Router)

  if (!user) {
    return (window.location.href = `#login`)
  }

  return (
    <div className="create-main">
      <SideNavUser preview={preview} setPreview={setPreview}/>
      {preview && params[0] === `preview` ? (
        <Preview preview={preview} setPreview={setPreview} />
      ) : (
        <Create setPreview={setPreview} />
      )}
    </div>
  )
}

export default Layout
