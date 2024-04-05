import React, { useContext } from "react"
import { Close } from "../../Icons/Icons"
import { Comment } from "../../Contexts/Comment"

function EditCommentModal({ setEditComment, editComment, currentItem }) {
    const {setUpdateComment} = useContext(Comment)
    const handleUpdateComment = _ =>{
        setUpdateComment(editComment)
        setEditComment(null)
    }
  return (
    <div className="edit-modal">
      <div className="modal-content">
        <div className="title">
          Edit comment
          <div onClick={_ => setEditComment(null)} className="close-wrapper">
            <Close />
          </div>
        </div>
        <div className="modal-body">
          <textarea
            value={editComment.newComment}
            onChange={e => setEditComment(prev => ({ ...prev, newComment: e.target.value }))}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="buttons">
          <button onClick={_ => setEditComment(null)}>Cancel</button>
          <button onClick={handleUpdateComment}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default EditCommentModal
