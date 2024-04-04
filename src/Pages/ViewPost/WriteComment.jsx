import React, { useContext, useState } from "react"
import { Post } from "../../Contexts/Post"
import useSignup from "../../Hooks/useSignup"
import { Authorization } from "../../Contexts/Authorization"
import { v4 as uuidv4 } from "uuid"

function WriteComment({ currentItem }) {
  const { setStoreComment } = useContext(Post)
  const [writeComment, setWriteComment] = useState(``)
  const { user } = useContext(Authorization)

  const handlePostComment = _ => {
    if (writeComment === ``) return
    setStoreComment({
      comment: writeComment,
      commenterUsername: user.username,
      commenterId: user.id,
      postId: currentItem._id,
      updateType: `comment`,
      commentId: uuidv4(),
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
