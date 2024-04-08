import {  Chevron } from "../../Icons/Icons"
import { useContext} from "react"
import { Comment } from "../../Contexts/Comment"

function Pagination({prePage, nextPage, commentPages}) {
    const {comments} = useContext(Comment)
  return (
    <div className="pagination">
    <div className="page-numbers">
      <div onClick={prePage} className="prev-page">
        {commentPages.currentPage > 1 && (
          <div className="number">
            <Chevron />
            {commentPages.currentPage - 1}
          </div>
        )}
      </div>
      <div className="curr-page number">{commentPages.currentPage}</div>
      <div onClick={nextPage} className="next-page">
        {comments.length > commentPages.pagesTo && (
          <div className="number">
            {commentPages.currentPage + 1}
            <Chevron />
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default Pagination
