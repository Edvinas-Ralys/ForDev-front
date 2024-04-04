import React, { useContext, useState } from "react"
import { Post } from "../../Contexts/Post"
import useSignup from "../../Hooks/useSignup"
import { Authorization } from "../../Contexts/Authorization"

function WriteComment({currentItem}) {
    const {setStoreComment} = useContext(Post)
    const [writeComment, setWriteComment] = useState(``)
    const {user} = useContext(Authorization)

    // console.log(currentItem)

    const handlePostComment = _ =>{
        if(writeComment === ``) return
        setStoreComment({comment:writeComment, commenterUsername:user.username, commenterId:user.id, postId:currentItem._id, updateType:`comment`})
    }

  return (
    <div className="write-comment">
      <div className="write-container">
        <div className="comment-title">Leave a comment</div>
        <textarea value={writeComment} onChange={e => setWriteComment(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
        <button onClick={handlePostComment}>Comment</button>
      </div>
    </div>
  )
}

export default WriteComment
