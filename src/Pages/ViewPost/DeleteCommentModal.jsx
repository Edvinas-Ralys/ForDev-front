import { useContext } from "react"
import { Close } from "../../Icons/Icons"
import { Post } from "../../Contexts/Post"

function DeleteCommentModal({setDeleteComment, deleteComment}) {
    const {setDestroyComment} = useContext(Post)
    console.log(deleteComment)
    const handleDestroyComment = _ =>{
        setDestroyComment(deleteComment)
        setDeleteComment(null)
    }


  return (
    <div className="delete-modal">
      <div className="modal-content">
        <div className="title">
          Delete comment?
          <div onClick={_=>setDeleteComment(null)} className="close-wrapper">
            <Close />
          </div>
        </div>
        <div className="modal-body">
          Are you sure you want to delete the comment?
        </div>
        <div className="buttons">
          <button onClick={_=>setDeleteComment(null)}>Cancel</button>
          <button onClick={handleDestroyComment} >Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteCommentModal
