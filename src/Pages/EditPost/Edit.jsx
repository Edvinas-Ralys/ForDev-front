import React, { useContext, useEffect} from "react"
import { Post } from "../../Contexts/Post"
import { postCategories } from "../../Data/postCategories"
import { CameraIcon } from "../../Icons/Icons"
import { Editor } from "primereact/editor"
import {SERVER_URL} from '../../Data/main'

function Edit({setPreview}) {
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
        editPost,
        setEditPost
      } = useContext(Post)

      const selectCategory = category => {
        if (editPost.tags.includes(category)) {
            setEditPost(prev => ({...prev, tags:prev.tags.filter(cat => cat !== category)}))
        } else {
            setEditPost(prev => ({...prev, tags:[...prev.tags, category]}))
        }
      }
      useEffect(
        _ => {
          setPostImage(image)
        },
        [image]
      )

      const handlePreviewPost = _ => {
        setPreview({title: editPost.title, text: editPost.text, tags: editPost.tags, image: editPost.image, type:`edit` })
      }

      const handleTextContent = value => {
        if (value.includes(`<img src`)) {
          const image = value.substr(3, value.length - 7)
          console.log(image)
        }
      }
      const handleTitleInput = e =>{
        setEditPost(prev => ({...prev, title:e.target.value}))
      }

      const handleTextInput = e =>{
        setEditPost(prev => ({...prev, text:e}))
      }

      const handleRemoveImage = _ =>{
        console.log()
        if(editPost.image){
            setEditPost(prev => ({...prev, image:null}))
        } else {
            setImage(null)
        }
      }

      useEffect(_=>{
        if(image !== null){
            setEditPost(prev => ({...prev, image:image}))
        }
      }, [image])
  return (
    <>
      <div className="create-post-page">
        <div className="create-content">
          <div className="title">Edit A Post</div>
          {/* <div className="test-text">{parse(content)}</div> */}
          <div className="creation-form">
            <div className="form">
              <div className="form-top">
                <div className="left">
                  <div className="form-element">
                    <div className="floating-label-group">
                      <label className="floating-label">Title</label>
                      <input type="text" value={editPost.title} onChange={e => handleTitleInput(e)} />
                    </div>
                  </div>
                  <div className="form-element">
                    <div className="floating-label-group">
                      <Editor
                        value={editPost.text}
                        onTextChange={e => handleTextInput(e.htmlValue)}
                        style={{ height: "35vh" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="form-element">
                    {editPost.image === null ? (
                      <label className="add-file" htmlFor="addFile">
                        <CameraIcon />
                        <input type="file" id="addFile" onChange={readImage} />
                      </label>
                    ) : (
                      <div className="image-container">
                        {editPost.image.includes(`data`) ? <img src={editPost.image} /> : <img src={`${SERVER_URL}/images/${editPost.image}`} />}

                        <div className="image-buttons">
                          <button onClick={handleRemoveImage} className="clear">
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
                      className={`tag ${editPost.tags.includes(cat.title) ? `selected-tag` : ``}`}
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
              <a href="#edit-post/preview">Preview post</a>
            </button>
            <a href="#home">Home</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit
