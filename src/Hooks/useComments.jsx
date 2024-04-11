import { useContext, useEffect, useState } from "react"
import { Authorization } from "../Contexts/Authorization"
import { Messages } from "../Contexts/Messages"
import axios from "axios"
import { SERVER_URL } from "../Data/main"
import * as a from "../Actions/commentActions"
import { Post } from "../Contexts/Post"

function useComments(dispatchComments) {
  const { user } = useContext(Authorization)
  const { addMessage } = useContext(Messages)
  const { setLoading } = useContext(Post)
  const [storeComment, setStoreComment] = useState(null)
  const [destroyComment, setDestroyComment] = useState(null)
  const [getComments, setGetComments] = useState(null)
  const [updateComment, setUpdateComment] = useState(null)


  //Create a comment
  useEffect(
    _ => {
      if (storeComment === null) {
        return
      }
      setLoading(true)
      const headers = { Authorization: `${user ? `Bearer ${user.token}` : null}` }
      axios
        .post(`${SERVER_URL}/comment`, storeComment, { headers: headers })
        .then(res => {
          dispatchComments(a.addComment(res.data.commentObject))
          addMessage(res.data.message)
        })
        .catch(err => {
          if (err.response.status) {
            addMessage(err.response.data.message)
          } else if (err.code === `ERR_NETWORK`) {
            window.location.href = `#network-error`
          }
        })
        .finally(_ => {
          setStoreComment(null)
          setLoading(false)
        })
    },
    [storeComment, addMessage, setStoreComment, setLoading, dispatchComments, user]
  )

  //Get comments for a post
  useEffect(
    _ => {
      if (getComments === null) {
        return
      }
      axios
        .get(`${SERVER_URL}/comment`, { params: getComments })
        .then(res => {
          dispatchComments(a.getComments(res.data.comments))
        })
        .catch(err => {
          if (err.response.status) {
            addMessage(err.response.data.message)
          } else if (err.code === `ERR_NETWORK`) {
            window.location.href = `#network-error`
          }
        })
    },
    [getComments, dispatchComments, addMessage]
  )

  useEffect(_=>{
    if(destroyComment !== null && destroyComment.headers === undefined){
      setDestroyComment(prev => ({data: {...prev}, headers:{ Authorization: `${user ? `Bearer ${user.token}` : null}` }}))
    }

  }, [destroyComment, user, setDestroyComment])

  //Delete comment
  useEffect(
    _ => {
      if (destroyComment === null || !destroyComment.headers) {
        return
      }
      setLoading(true)
      axios
        .delete(`${SERVER_URL}/comment`, destroyComment)
        .then(res => {
          dispatchComments(a.deleteComment(res.data.deletedId))
          addMessage(res.data.message)
        })
        .catch(err => {
          if (err.response.status) {
            addMessage(err.response.data.message)
          } else if (err.code === `ERR_NETWORK`) {
            window.location.href = `#network-error`
          }
        })
        .finally(_ => {
          setLoading(false)
          setDestroyComment(null)
        })
    },
    [destroyComment, setLoading, dispatchComments, addMessage, setDestroyComment]
  )


  useEffect(_=>{
    if(updateComment !== null && updateComment.headers === undefined){
      setUpdateComment(prev => ({...prev, headers:{ Authorization: `${user ? `Bearer ${user.token}` : null}` }}))
    }

  }, [updateComment, user, setUpdateComment])

  //Update comment
  useEffect(
    _ => {
      if (updateComment === null || !updateComment.headers) {
        return
      }
      if (updateComment.originalComment === updateComment.newComment) {
        addMessage({ text: `Can not repost original comment`, type: `error` })
        return
      }
      setLoading(true)
      axios
        .patch(`${SERVER_URL}/comment`, updateComment, { headers: updateComment.headers })
        .then(res => {
          dispatchComments(a.updateComment(res.data.updatedComment))
          addMessage(res.data.message)
          if (window.location.href === `#profile`) {
            window.location.reload()
          }
        })
        .catch(err => {
          if (err.response.status) {
            addMessage(err.response.data.message)
          } else if (err.code === `ERR_NETWORK`) {
            window.location.href = `#network-error`
          }
        })
        .finally(_ => {
          setLoading(false)
          setUpdateComment(null)
        })
    },
    [updateComment, addMessage, dispatchComments, setLoading, setUpdateComment, user]
  )

  return { setStoreComment, setDestroyComment, setGetComments, setUpdateComment }
}

export default useComments
