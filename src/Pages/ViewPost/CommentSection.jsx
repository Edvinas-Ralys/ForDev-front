import { ProfileIcon } from "../../Icons/Icons"

function CommentSection({ currentItem }) {
  return (
    <div className="comment-section">
      <div className="comment-container">
        <div className="comment-section-title">Comment Section ({currentItem.comments.length})</div>
        <div className="comments">
          {currentItem.comments.map((comment, i) => (
            <div key={i} className="comment">
              <div className="top">
                <div className="left">
                  <ProfileIcon />
                </div>
                <div className="right">
                  <div className="name">{comment.commenterUsername}</div>
                  <div className="date">{comment.commentPosted}</div>
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
