import React, { useContext, useState } from "react"
import { Profile } from "../../../Contexts/Profile"
import { Authorization } from "../../../Contexts/Authorization"
import { Router } from "../../../Contexts/Router"
import { Pen, TrashCan } from "../../../Icons/Icons"
import CommentPagiantion from "./CommentPagination"

function CommentTab({ setEditComment, setDeleteComment }) {
  const { profile } = useContext(Profile)
  const { user } = useContext(Authorization)
  const [commentPages, setCommentPages] = useState({
    pagesFrom: 0,
    pagesTo: 5,
    currentPage: 1,
  })
  const { params } = useContext(Router)

  const handleDeletComment = comment => {
    setDeleteComment({ postId: comment.postId, commentId: comment.id, userId: Number(user.id) })
  }

  const viewPost = id => {
    window.location.href = `#view/${id}`
  }

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

  const handleEditComment = (commentId, originalComment, postId, postTitle) => {
    setEditComment({
      postId: postId,
      commentId,
      userId: Number(user.id),
      originalComment,
      newComment: originalComment,
      postTitle,
    })
  }
  return (
    <div className="comment-tab">
      <div className="comments">
        {profile.userComments.map(
          (comment, i) =>
            i >= commentPages.pagesFrom &&
            i < commentPages.pagesTo && (
              <div key={i} className="comment">
                <div className="info">
                  <div onClick={_ => viewPost(comment.postId)} className="comment-title">
                    {comment.commentContent.length > 60
                      ? `${comment.commentContent.slice(0, 60)}...`
                      : comment.commentContent}
                  </div>
                  <div className="comment-created">{comment.created}</div>
                  <div className="comment-post">{comment.postTitle}</div>
                </div>
                {user ? (
                  user.id === params[0] ? (
                    <div className="post-buttons">
                      <div
                        onClick={_ =>
                          handleEditComment(
                            comment.id,
                            comment.commentContent,
                            comment.postId,
                            comment.postTitle
                          )
                        }
                        className="pen-wrapper icon"
                      >
                        <Pen />
                      </div>
                      <div
                        onClick={_ => handleDeletComment(comment.id)}
                        className="trashcan-wrapper icon"
                      >
                        <TrashCan />
                      </div>
                    </div>
                  ) : (
                    ``
                  )
                ) : (
                  ``
                )}
              </div>
            )
        )}
      </div>
      {profile.userComments.length > 5 && (
        <CommentPagiantion
          commentPages={commentPages}
          setCommentPages={setCommentPages}
          nextPage={nextPage}
          prePage={prePage}
        />
      )}
    </div>
  )
}

export default CommentTab
