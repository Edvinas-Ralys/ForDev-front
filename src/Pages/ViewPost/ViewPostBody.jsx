import React from "react"
import ViewBody from "./ViewBody"
import WriteComment from "./WriteComment"
import CommentSection from "./CommentSection"

function ViewPostBody({ currentItem }) {
  return (
    <>
      <ViewBody currentItem={currentItem} />
      <WriteComment currentItem={currentItem} />
      <CommentSection currentItem={currentItem} />
    </>
  )
}

export default ViewPostBody
