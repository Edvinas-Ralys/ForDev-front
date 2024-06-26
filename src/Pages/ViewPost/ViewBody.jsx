import { SERVER_URL } from "../../Data/main"
import parse from "html-react-parser"
import { TrashCan } from "../../Icons/Icons"
import { useContext } from "react"
import { Authorization } from "../../Contexts/Authorization"

function ViewBody({ currentItem, setDeletePost }) {
  const { user } = useContext(Authorization)
  // const [deletePost, setDeletePost] = useState(null)

  return (
    <>
      <div className="post-title">{currentItem.title}</div>
      <div className="creator">
        <span>Written by</span>
        <span>
          <a href={`#profile/${currentItem.userId}`}> {currentItem.createdBy}</a>, {currentItem.createdAt.slice(0, 10)}
        </span>
        { user && Number(user.id) === currentItem.userId && (
          <div
            onClick={_ => setDeletePost({ postId: currentItem._id, userId: Number(user.id) })}
            className="trash-wrapper"
          >
            <TrashCan />
          </div>
        )}

        <div className="tags">
          {currentItem?.tags.map((tag, i) => (
            <div key={i} className="post-tag">
              {tag}
            </div>
          ))}
        </div>
      </div>

      {currentItem.image && (
        <div className="view-image">
          <img src={`${SERVER_URL}/images/${currentItem.image}`} alt="" />
        </div>
      )}
      <div className="story-container">
        <div className="story">{parse(currentItem.text)}</div>
      </div>
    </>
  )
}

export default ViewBody
