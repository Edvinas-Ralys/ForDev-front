import React, { useContext, useEffect, useState } from "react"
import PostTab from "./History/PostTab"
import CommentTab from "./History/CommentTab"
import DeleteModal from "./History/DeleteModal"
import EditCommentModal from "../ViewPost/EditCommentModal"
import { Profile } from "../../Contexts/Profile"
import DeleteCommentModal from "../ViewPost/DeleteCommentModal"

function History() {
  const [activeTab, setActiveTab] = useState(`posts`)
  const [deletePost, setDeletePost] = useState(null)
  const [editComment, setEditComment] = useState(null)
  const [deleteComment, setDeleteComment] = useState(null)
  const { profile } = useContext(Profile)

  useEffect(
    _ => {
      console.log(deletePost)
    },
    [deletePost]
  )

  return (
    <div className="history">
      <div className="tabs">
        <div
          onClick={_ => setActiveTab(`posts`)}
          className={`tab ${activeTab !== `posts` ? `inactive` : ``}`}
        >
          Posts({profile.userPosts.length})
        </div>
        <div
          onClick={_ => setActiveTab(`comments`)}
          className={`tab ${activeTab !== `comments` ? `inactive` : ``}`}
        >
          Comments({profile.userComments.length})
        </div>
      </div>
      {activeTab === `posts` ? (
        <PostTab deletePost={deletePost} setDeletePost={setDeletePost} />
      ) : (
        <CommentTab editComment={editComment} setEditComment={setEditComment} setDeleteComment={setDeleteComment} />
      )}
      {deletePost && <DeleteModal setDeletePost={setDeletePost} deletePost={deletePost} />}
      {editComment && (
        <EditCommentModal editComment={editComment} setEditComment={setEditComment} />
      )}
      {deleteComment && <DeleteCommentModal deleteComment={deleteComment} setDeleteComment={setDeleteComment}/>}
    </div>
  )
}

export default History
