import React, { useContext } from "react"
import { Close } from "../../../Icons/Icons"
import { Post } from "../../../Contexts/Post"

function DeleteModal({ setDeletePost, deletePost }) {
  const { setDestroyPost } = useContext(Post)

  const handleDeletePost = _ => {
    setDeletePost(null)
    setDestroyPost(deletePost)
  }
  return (
    <div className="delete-modal">
      <div className="modal-content">
        <div className="title">
          Post will be deleted
          <div onClick={_ => setDeletePost(null)} className="close-wrapper">
            <Close />
          </div>
        </div>
        <div className="modal-body-delete">
          Are you sure you want to delete post "<span className="post-title">{deletePost?.postTitle}</span>"?
        </div>
        <div className="buttons">
          <button onClick={_ => setDeletePost(null)}>Cancel</button>
          <button onClick={handleDeletePost}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
