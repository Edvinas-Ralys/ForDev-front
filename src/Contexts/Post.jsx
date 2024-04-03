import { createContext, useReducer, useState } from "react"
import usePost from "../Hooks/usePost"
import postReducer from "../Reducers/postReducer"
import useImage from "../Hooks/useImage"

export const Post = createContext()
export const PostProvider = ({ children }) => {
  const [posts, dispatchPosts] = useReducer(postReducer, [])

  const { setStorePost } = usePost(dispatchPosts)
  const { image, setImage, readImage } = useImage()
  const [title, setTitle] = useState(``)
  const [content, setContent] = useState({
    text:``,
    images:[]
  })
  const [categories, setCategories] = useState([])
  const [postImage, setPostImage] = useState(null)

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
      }}
    >
      {children}
    </Post.Provider>
  )
}
