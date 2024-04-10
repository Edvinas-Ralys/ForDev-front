import React, { useContext } from "react"
import PostBody from "./PostBody"
import { Post } from "../../Contexts/Post"

function Preview({ preview, setPreview }) {

  return (
    <div className="preview-page">

      <div className="preview-content">
        <PostBody preview={preview} setPreview={setPreview} />
      </div>

    </div>
  )
}

export default Preview
