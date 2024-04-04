import React from "react"
import ViewBody from "./ViewBody"
import WriteComment from "./WriteComment"
import CommentSection from "./CommentSection"

function ViewPostBody({ currentItem, setDeletePost, deletePost, setDeleteComment }) {
  return (
    <>
      <ViewBody currentItem={currentItem} setDeletePost={setDeletePost} deletePost={deletePost} />
      <WriteComment currentItem={currentItem} />
      <CommentSection currentItem={currentItem} setDeleteComment={setDeleteComment} />
    </>
  )
}

export default ViewPostBody
