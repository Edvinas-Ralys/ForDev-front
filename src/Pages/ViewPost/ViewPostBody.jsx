import React, { useContext } from "react"
import ViewBody from "./ViewBody"
import WriteComment from "./WriteComment"
import CommentSection from "./CommentSection"
import { Authorization } from "../../Contexts/Authorization"

function ViewPostBody({
  currentItem,
  setDeletePost,
  deletePost,
  setDeleteComment,
  editComment,
  setEditComment,
}) {
  const { user } = useContext(Authorization)
  return (
    <>
      <ViewBody currentItem={currentItem} setDeletePost={setDeletePost} deletePost={deletePost} />
      {user && <WriteComment currentItem={currentItem} />}

      <CommentSection
        currentItem={currentItem}
        setDeleteComment={setDeleteComment}
        setEditComment={setEditComment}
      />
    </>
  )
}

export default ViewPostBody
