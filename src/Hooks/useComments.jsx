import { useContext, useEffect, useState } from "react"
import { Authorization } from "../Contexts/Authorization"
import { Messages } from "../Contexts/Messages"
import axios from "axios"
import { SERVER_URL } from "../Data/main"
import * as a from "../Actions/commentActions"
import { Router } from "../Contexts/Router"
import { Post } from "../Contexts/Post"

function useComments(dispatchComments) {
  const { user } = useContext(Authorization)
  const { addMessage } = useContext(Messages)
  const { setLoading } = useContext(Post)
  const [storeComment, setStoreComment] = useState(null)
  const [destroyComment, setDestroyComment] = useState(null)
  const [getComments, setGetComments] = useState(null)
  const [updateComment, setUpdateComment] = useState(null)

  let delCommentConfig = {
    data: { ...destroyComment },
    headers: { Authorization: `${user ? `Bearer ${user.token}` : null}` },
  }

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
          console.log(res.data)
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
    [storeComment]
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
    [getComments]
  )

  //Delete comment
  useEffect(
    _ => {
      if (destroyComment === null) {
        return
      }
      console.log(destroyComment)
      setLoading(true)
      axios
        .delete(`${SERVER_URL}/comment`, delCommentConfig)
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
    [destroyComment]
  )

  //Update comment
  useEffect(_=>{
    if(updateComment === null){
      return
    }
    const headers = { Authorization: `Bearer ${user.token}` }

    if(updateComment.originalComment === updateComment.newComment){
      addMessage({text:`Can not repost original comment`, type:`error`})
      return
    }
    setLoading(true)
    axios.patch(`${SERVER_URL}/comment`, updateComment, {headers:headers})
      .then(res => {
        dispatchComments(a.updateComment(res.data.updatedComment))
        addMessage(res.data.message)
        if(window.location.href === `#profile`){
          window.location.reload()
        }
      })
      .catch(err => {
        console.log(err)
        if (err.response.status) {
          addMessage(err.response.data.message)
        } else if (err.code === `ERR_NETWORK`) {
          window.location.href = `#network-error`
        }
      })
      .finally(_=>{
        setLoading(false)
        setUpdateComment(null)
      })

  }, [updateComment])

  return { setStoreComment, setDestroyComment, setGetComments, setUpdateComment }
}

export default useComments
