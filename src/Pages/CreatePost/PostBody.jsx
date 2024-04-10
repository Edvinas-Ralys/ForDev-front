import React, { useContext } from "react"
import { SERVER_URL } from "../../Data/main"
import { Authorization } from "../../Contexts/Authorization"
import parse from "html-react-parser"
import { Post } from "../../Contexts/Post"

function PostBody({ preview, setPreview }) {
  const { setStorePost, setImage, setTitle, setContent, setCategories, setUpdatePost } = useContext(Post)
  const { user } = useContext(Authorization)
  const date = new Date()
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  let year = date.getFullYear()
  let currentDate = `${day}-${month}-${year}`

  const handleSaveChanges = _ => {
    console.log(preview)
    if(preview.type === `edit`){
      console.log(preview)
      setUpdatePost(preview)
    } else {
      setStorePost(preview)
      setPreview(null)
      setImage(null)
      setTitle(``)
      setContent(``)
      setCategories([])
    }

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
            <div key={i} className="post-tag">{tag}</div>
          ))}
        </div>
      </div>

      {preview.image && (

        <div className="view-image">
          {preview.image.includes(`data`) ? <img src={preview.image} alt="" />
          :<img src={`${SERVER_URL}/images/${preview.image}`} alt="" /> }

        </div>
      )}
      <div className="story-container">
        <div className="story">{parse(preview.text)}</div>
      </div>
      <div className="buttons">
        <button onClick={_ => setPreview(null)}>Back to Edit</button>
        <button onClick={handleSaveChanges}>{preview.type === `edit` ? `Save Changes` : `Publish`}</button>
      </div>
    </>
  )
}

export default PostBody
