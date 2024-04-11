import React, { useContext, useEffect} from "react"
import { Post } from "../../Contexts/Post"
import { postCategories } from "../../Data/postCategories"
import { CameraIcon } from "../../Icons/Icons"
import { Editor } from "primereact/editor"


function Create({ setPreview }) {
  const {
    image,
    setImage,
    readImage,
    title,
    setTitle,
    content,
    setContent,
    categories,
    setCategories,
    postImage,
    setPostImage,
  } = useContext(Post)

  const selectCategory = category => {
    if (categories.includes(category)) {
      setCategories(prev => prev.filter(cat => cat !== category))
    } else {
      setCategories(prev => [...prev, category])
    }
  }
  useEffect(
    _ => {
      setPostImage(image)
    },
    [image, setPostImage]
  )

  const handlePreviewPost = _ => {
    setPreview({title: title, text: content, tags: categories, image: image })
  }



  return (
    <>
      <div className="create-post-page">
        <div className="create-content">
          <div className="title">Create A Post</div>
          <div className="creation-form">
            <div className="form">
              <div className="form-top">
                <div className="left">
                  <div className="form-element">
                    <div className="floating-label-group">
                      <label className="floating-label">Title</label>
                      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-element">
                    <div className="floating-label-group">
                      <Editor
                        value={content}
                        onTextChange={e => setContent(e.htmlValue)}
                        style={{ height: "35vh" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="form-element">
                    {postImage === null ? (
                      <label className="add-file" htmlFor="addFile">
                        <CameraIcon />
                        <input type="file" id="addFile" onChange={readImage} />
                      </label>
                    ) : (
                      <div className="image-container">
                        <img src={postImage} alt="Banner" />
                        <div className="image-buttons">
                          <button onClick={_ => setImage(null)} className="clear">
                            Delete Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-element">
                <div className="tags-pool">
                  {postCategories.map(cat => (
                    <div
                      key={cat.id}
                      onClick={_ => selectCategory(cat.title)}
                      className={`tag ${categories.includes(cat.title) ? `selected-tag` : ``}`}
                    >
                      {cat.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="create-post">
            <button onClick={handlePreviewPost}>
              <a href="#create-post/preview">Preview post</a>
            </button>
            <a href="#home">Home</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Create
