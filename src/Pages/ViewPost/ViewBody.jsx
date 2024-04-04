import { SERVER_URL } from '../../Data/main'
import parse from "html-react-parser"

function ViewBody({currentItem}) {
  return (
    <>
            <div className="post-title">{currentItem.title}</div>
      <div className="creator">
        {/* <ProfileIcon /> */}
        Written by
        <span>
          <a href="/"> {currentItem.createdBy}</a>, {currentItem.createdAt.slice(0, 10)}
        </span>
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
      {/* <button onClick={_ => setPreview(null)}>Edit</button> */}
      {/* <button onClick={handlePublishPost}>Publish</button> */}
    </>
  )
}

export default ViewBody
