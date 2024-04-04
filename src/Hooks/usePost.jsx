import React, { useContext, useEffect, useState } from "react"
import { Authorization } from "../Contexts/Authorization"
import { Messages } from "../Contexts/Messages"
import axios from "axios"
import { SERVER_URL } from "../Data/main"
import * as a from "../Actions/postActions"
import { Router } from "../Contexts/Router"

function usePost(dispatchPosts) {
  const { user } = useContext(Authorization)
  const { addMessage } = useContext(Messages)
  const setErrorPageType = useContext(Router)
  const [storePost, setStorePost] = useState(null)
  const [storeComment, setStoreComment] = useState(null)
  const [destroyPost, setDestroyPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [getNumberOfPosts, setGetNumberOfPosts] = useState({
    limit: 10,
    skip: 0,
  })
  let delConfig = {
    data: { destroyPost },
    headers: { Authorization: `Bearer ${user?.token}` },
  }

  //Get all posts
  //Finished
  useEffect(_ => {
    setLoading(true)
    axios
      .get(`${SERVER_URL}/posts`, { params: getNumberOfPosts })
      .then(res => {
        dispatchPosts(a.getPosts(res.data.posts))
      })
      .catch(err => {
        window.location.href = `#network-error`
      })
      .finally(_ => {
        setLoading(false)
      })
  }, [])

  //Create post
  useEffect(
    _ => {
      if (storePost === null) {
        return
      }
      setLoading(true)
      const headers = { Authorization: `Bearer ${user.token}` }
      axios
        .post(
          `${SERVER_URL}/posts`,
          { ...storePost, userId: user.id, createdBy: user.username },
          { headers: headers }
        )
        .then(res => {
          dispatchPosts(a.createPost(res.data))
          window.location.href = `#view/${res.data._id}`
        })
        .catch(err => {
          console.log(err)
          if (err.response.status === 400) {
            addMessage(err.response.data.message)
          }
        })
        .finally(_ => {
          setLoading(false)
          setStorePost(null)
        })
    },
    [storePost]
  )


  //Leave a comment
  useEffect(
    _ => {
      if (storeComment === null) {
        return
      }
      const headers = { Authorization: `Bearer ${user.token}` }
      axios
        .patch(`${SERVER_URL}/posts`, storeComment, { headers: headers })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      // console.log(storeComment)
    },
    [storeComment]
  )


  //Delete a post
  useEffect(
    _ => {
      if (destroyPost === null) {
        return
      }
      axios
        .delete(`${SERVER_URL}/posts`, delConfig)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          setDestroyPost(null)
        })
      console.log(destroyPost)
    },
    [destroyPost]
  )

  return { setStorePost, setStoreComment, setDestroyPost, loading }
}

export default usePost
