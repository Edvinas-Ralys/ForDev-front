import React, { useContext } from "react"
import { SERVER_URL } from "../../Data/main"
import { Authorization } from "../../Contexts/Authorization"
import parse from 'html-react-parser';

function PostBody({ preview }) {
  const { user } = useContext(Authorization)
  console.log(preview)
  const date = new Date()
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  let year = date.getFullYear()
  let currentDate = `${day}-${month}-${year}`


  return (
    <>
      <div className="post-title">{preview.title}</div>
      {preview.image && (
        <div className="view-image">
          <img src={preview.image} alt="" />
        </div>
      )}
      <div className="creator">
        {/* <ProfileIcon /> */}
        Written by{" "}
        <span>
          {user.username}, {currentDate}{" "}
        </span>
      </div>
      <div className="date">
        {/* Created : {currFundrasier.createdAt.slice(0, 10)}
        <Tag />
        <span>{currFundrasier.type}</span> */}
      </div>
      <div className="story-container">
      <div className="story">{parse(preview.text)}</div>
      </div>

    </>
  )
}

export default PostBody
