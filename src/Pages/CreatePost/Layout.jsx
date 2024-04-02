import React, { useContext, useState } from "react"
import Create from "./Create"
import Preview from "./Preview"
import { Authorization } from "../../Contexts/Authorization"
import { Router } from "../../Contexts/Router"

function Layout() {
  const { user } = useContext(Authorization)
  const [preview, setPreview] = useState(null)
  const {params} = useContext(Router)

  console.log(params)
  if (!user) {
    return (window.location.href = `#login`)
  }

  return (
    <>
    {preview && params[0] === `preview` ? <Preview /> :  <Create setPreview={setPreview} />}
    </>
  )
}

export default Layout
