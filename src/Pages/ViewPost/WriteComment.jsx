import React, { useContext, useState } from "react"
import { Post } from "../../Contexts/Post"
import { Authorization } from "../../Contexts/Authorization"
import { v4 as uuidv4 } from "uuid"
import { Comment } from "../../Contexts/Comment"

function WriteComment({ currentItem }) {
  const { setStoreComment } = useContext(Comment)
  const [writeComment, setWriteComment] = useState(``)
  const { user } = useContext(Authorization)
  // console.log(typeof user.id)

  const handlePostComment = _ => {
    if (writeComment === ``) return
    setStoreComment({
      commentContent: writeComment,
      postId: currentItem._id,
      commenterUsername: user.username,
      commenterId: Number(user.id),
      id: uuidv4(),
    })
    setWriteComment(``)
  }

  return (
    <div className="write-comment">
      <div className="write-container">
        <div className="comment-title">Leave a comment</div>
        <textarea
          value={writeComment}
          onChange={e => setWriteComment(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button onClick={handlePostComment}>Comment</button>
      </div>
    </div>
  )
}

export default WriteComment
