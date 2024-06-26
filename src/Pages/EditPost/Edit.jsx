import React, { useContext, useEffect} from "react"
import { Post } from "../../Contexts/Post"
import { Authorization } from "../../Contexts/Authorization"
import { Messages } from "../../Contexts/Messages"
import { postCategories } from "../../Data/postCategories"
import { CameraIcon } from "../../Icons/Icons"
import { Editor } from "primereact/editor"
import {SERVER_URL} from '../../Data/main'

function Edit({setPreview}) {
    const {
        image,
        setImage,
        readImage,
        setPostImage,
        editPost,
        setEditPost
      } = useContext(Post)
      const {user} = useContext(Authorization)
      const {addMessage} = useContext(Messages)


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
        [image, setPostImage]
      )

      const handlePreviewPost = _ => {
        if(!editPost.title || !editPost.text || !editPost.tags || editPost.tags.length === 0){
          addMessage({text:`All fields are required`, type:`error`})
        } else {
          setPreview({title: editPost.title, text: editPost.text, tags: editPost.tags, image: editPost.image, type:`edit`, postId:editPost.postId, userId:user.id })
        }

      }

      const handleTitleInput = e =>{
        setEditPost(prev => ({...prev, title:e.target.value}))
      }

      const handleTextInput = e =>{
        setEditPost(prev => ({...prev, text:e}))
      }

      const handleRemoveImage = _ =>{
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
      }, [image, setEditPost])
  return (
    <>
      <div className="create-post-page">
        <div className="create-content">
          <div className="title">Edit A Post</div>
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
                        {editPost.image.includes(`data`) ? <img src={editPost.image} alt={`${editPost.title}`} /> : <img src={`${SERVER_URL}/images/${editPost.image}`} alt={`${editPost.title}`} />}

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
