import { createContext, useReducer } from "react"
import commentReducer from "../Reducers/commentReducer"
import useComments from "../Hooks/useComments"

export const Comment = createContext()
export const CommentProvider = ({ children }) => {
  const [comments, dispatchComments] = useReducer(commentReducer, [])
  const { setDestroyComment, setStoreComment, setGetComments, setUpdateComment } =
    useComments(dispatchComments)

  return (
    <Comment.Provider
      value={{ setDestroyComment, setStoreComment, setGetComments, comments, setUpdateComment }}
    >
      {children}
    </Comment.Provider>
  )
}
