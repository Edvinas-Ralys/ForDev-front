import { createContext, useReducer, useState } from "react"
import usePost from "../Hooks/usePost"
import postReducer from "../Reducers/postReducer"
import useImage from "../Hooks/useImage"

export const Post = createContext()
export const PostProvider = ({ children }) => {
  const [posts, dispatchPosts] = useReducer(postReducer, [])

  const { setStorePost, setDestroyPost, loading, setLoading } =
    usePost(dispatchPosts)
  const { image, setImage, readImage } = useImage()
  const [title, setTitle] = useState(``)
  const [content, setContent] = useState(``)
  const [categories, setCategories] = useState([])
  const [postImage, setPostImage] = useState(null)
  const [previewPost, setPreviewPost] = useState(null)

  return (
    <Post.Provider
      value={{
        setStorePost,
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
        previewPost,
        setPreviewPost,
        posts,
        setDestroyPost,
        loading,
        setLoading,
      }}
    >
      {children}
    </Post.Provider>
  )
}
