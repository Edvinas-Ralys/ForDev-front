import React from "react"
import { SERVER_URL } from "../../Data/main"
import parse from "html-react-parser"
import ViewBody from "./ViewBody"
import WriteComment from "./WriteComment"
import { ProfileIcon } from "../../Icons/Icons"
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
