import { useContext, useEffect, useState } from "react"
import { Pen, ProfileIcon, TrashCan, Chevron } from "../../Icons/Icons"
import { Authorization } from "../../Contexts/Authorization"
import { Post } from "../../Contexts/Post"
import { Comment } from "../../Contexts/Comment"
import Pagination from "./Pagination"

function CommentSection({ currentItem, setDeleteComment, setEditComment }) {
  const { user } = useContext(Authorization)
  const { comments } = useContext(Comment)
  const [commentPages, setCommentPages] = useState({
    pagesFrom: 0,
    pagesTo: 5,
    currentPage: 1,
  })

  const nextPage = _ => {
    setCommentPages(prev => ({
      ...prev,
      pagesFrom: prev.pagesTo,
      pagesTo: prev.pagesTo + 5,
      currentPage: prev.currentPage + 1,
    }))
  }
  const prePage = _ => {
    if (commentPages.currentPage > 1 && commentPages.pagesFrom !== 0) {
      setCommentPages(prev => ({
        ...prev,
        pagesFrom: prev.pagesFrom - 5,
        pagesTo: prev.pagesTo - 5,
        currentPage: prev.currentPage - 1,
      }))
    }
  }
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
            comments.map(
              (comment, i) =>
                i >= commentPages.pagesFrom &&
                i < commentPages.pagesTo && (
                  <div key={i} className="comment">
                    <div className="top">
                      <div className="left">
                        <ProfileIcon />
                      </div>
                      <div className="right">
                        <div className="name">
                          <a href={`#profile/${comment.commenterId}`}>
                            {comment.commenterUsername}
                          </a>
                        </div>
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
                )
            )}
        </div>
        {comments.length > 5 && (
          <Pagination commentPages={commentPages} nextPage={nextPage} prePage={prePage} />
        )}
      </div>
    </div>
  )
}

export default CommentSection
