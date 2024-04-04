import React from "react"
import PostBody from "./PostBody"

function Preview({ preview, setPreview }) {
  return (
    <div className="preview-page">

      <div className="preview-content">
        <PostBody preview={preview} setPreview={setPreview} />
      </div>
      <div className="profile-card"></div>
    </div>
  )
}

export default Preview
