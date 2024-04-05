import React, { useContext } from "react"
import { SERVER_URL } from "../../Data/main"
import { Authorization } from "../../Contexts/Authorization"
import parse from "html-react-parser"
import { Post } from "../../Contexts/Post"

function PostBody({ preview, setPreview }) {
  const { setStorePost, setImage, setTitle, setContent, setCategories } = useContext(Post)
  const { user } = useContext(Authorization)
  const date = new Date()
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  let year = date.getFullYear()
  let currentDate = `${day}-${month}-${year}`

  const handlePublishPost = _ => {
    setStorePost(preview)
    setPreview(null)
    setImage(null)
    setTitle(``)
    setContent(``)
    setCategories([])
  }

  return (
    <>
      <div className="post-title">{preview.title}</div>
      <div className="creator">
        {/* <ProfileIcon /> */}
        Written by
        <span>
          <a href="/"> {user.username}</a>, {currentDate}
        </span>
        <div className="tags">
          {preview?.tags.map((tag, i) => (
            <div className="post-tag">{tag}</div>
          ))}
        </div>
      </div>

      {preview.image && (
        <div className="view-image">
          <img src={preview.image} alt="" />
        </div>
      )}
      <div className="story-container">
        <div className="story">{parse(preview.text)}</div>
      </div>
      <button onClick={_ => setPreview(null)}>Edit</button>
      <button onClick={handlePublishPost}>Publish</button>
    </>
  )
}

export default PostBody
