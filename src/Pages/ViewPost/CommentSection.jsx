import { useContext } from "react"
import { ProfileIcon, TrashCan } from "../../Icons/Icons"
import { Authorization } from "../../Contexts/Authorization"
import { Post } from "../../Contexts/Post"
import { Comment } from "../../Contexts/Comment"

function CommentSection({ currentItem, setDeleteComment }) {
  const { user } = useContext(Authorization)
  const { setDestroyComment } = useContext(Post)
  const {comments} = useContext(Comment)
  const handleDeletComment = commentId => {
    setDeleteComment({ postId: currentItem._id, commentId, userId: user.id })
  }
  return (
    <div className="comment-section">
      <div className="comment-container">
        <div className="comment-section-title">Comment Section ({currentItem.comments.length})</div>
        <div className="comments">
        {/* {comments.length !==0 && comments.map((comment, i) => (
          <div className="comment">{comment.commentContent}</div>
        ))} */}





          {currentItem.comments.map((comment, i) => (
            <div key={i} className="comment">
              <div className="top">
                <div className="left">
                  <ProfileIcon />
                </div>
                <div className="right">
                  <div className="name">{comment.commenterUsername}</div>
                  <div className="date">{comment.commentPosted}</div>
                  {user && user.id === comment.commenterId && (
                    <div
                      onClick={_ => handleDeletComment(comment.commentId)}
                      className="trashcan-wrapper"
                    >
                      <TrashCan />
                    </div>
                  )}
                </div>
              </div>
              <div className="bottom">{comment.commentText}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommentSection
