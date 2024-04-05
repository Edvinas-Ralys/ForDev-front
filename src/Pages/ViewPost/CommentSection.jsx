import { useContext } from "react"
import { Pen, ProfileIcon, TrashCan } from "../../Icons/Icons"
import { Authorization } from "../../Contexts/Authorization"
import { Post } from "../../Contexts/Post"
import { Comment } from "../../Contexts/Comment"

function CommentSection({ currentItem, setDeleteComment, setEditComment }) {
  const { user } = useContext(Authorization)
  const { comments } = useContext(Comment)
  const handleDeletComment = commentId => {
    setDeleteComment({ postId: currentItem._id, commentId, userId: Number(user.id) })
  }
  const handleEditComment = (commentId, originalComment) => {
    setEditComment({
      postId: currentItem._id,
      commentId,
      userId: Number(user.id),
      originalComment,
      newComment: originalComment,
    })
  }
  return (
    <div className="comment-section">
      <div className="comment-container">
        <div className="comment-section-title">Comment Section ({comments.length})</div>
        <div className="comments">
          {comments.length !== 0 &&
            comments.map((comment, i) => (
              <div key={i} className="comment">
                <div className="top">
                  <div className="left">
                    <ProfileIcon />
                  </div>
                  <div className="right">
                    <div className="name">{comment.commenterUsername}</div>
                    <div className="date">
                      {comment.created}
                      {comment.originalComment && ` (edited)`}
                    </div>

                    {user && Number(user.id) === comment.commenterId && (
                      <div className="icons">
                        <div
                          onClick={_ => handleEditComment(comment.id, comment.commentContent)}
                          className="edit-wrapper"
                        >
                          <Pen />
                        </div>
                        <div
                          onClick={_ => handleDeletComment(comment.id)}
                          className="trashcan-wrapper"
                        >
                          <TrashCan />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bottom">{comment.commentContent}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default CommentSection
