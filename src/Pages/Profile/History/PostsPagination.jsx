import { Chevron } from "../../../Icons/Icons"
import { useContext } from "react"
import { Comment } from "../../../Contexts/Comment"
import { Profile } from "../../../Contexts/Profile"

function PostsPagination({prePage, nextPage, postPages}) {
    const { profile } = useContext(Profile)
    const { comment } = useContext(Comment)
  return (
    <div className="pagination">
      <div className="page-numbers">
        <div onClick={prePage} className="prev-page">
          {postPages.currentPage > 1 && (
            <div className="number">
              <Chevron />
              {postPages.currentPage - 1}
            </div>
          )}
        </div>
        <div className="curr-page number">{postPages.currentPage}</div>
        <div onClick={nextPage} className="next-page">
          {profile.userPosts.length > postPages.pagesTo && (
            <div className="number">
              {postPages.currentPage + 1}
              <Chevron />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostsPagination
