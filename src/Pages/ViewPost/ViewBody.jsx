import { SERVER_URL } from "../../Data/main"
import parse from "html-react-parser"
import { TrashCan } from "../../Icons/Icons"
import { useContext, useEffect, useState } from "react"
import { Authorization } from "../../Contexts/Authorization"
import DeleteModal from "./DeleteModal"

function ViewBody({ currentItem }) {
  const { user } = useContext(Authorization)
  const [deletePost, setDeletePost] = useState(null)

  console.log(currentItem)

  return (
    <>
      {deletePost && <DeleteModal setDeletePost={setDeletePost} currentItem={currentItem} deletePost={deletePost} />}

      <div className="post-title">{currentItem.title}</div>
      <div className="creator">
        <span>Written by</span>
        <span>
          <a href="/"> {currentItem.createdBy}</a>, {currentItem.createdAt.slice(0, 10)}
        </span>
        {Number(user.id) === currentItem.userId && (
          <div
            onClick={_ => setDeletePost({ postId: currentItem._id, userId: Number(user.id) })}
            className="trash-wrapper"
          >
            <TrashCan />
          </div>
        )}

        <div className="tags">
          {currentItem?.tags.map((tag, i) => (
            <div className="post-tag">{tag}</div>
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
