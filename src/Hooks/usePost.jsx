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
  const [destroyPost, setDestroyPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [getNumberOfPosts, setGetNumberOfPosts] = useState({
    limit: 10,
    skip: 0,
  })
  let delPostConfig = {
    data: { ...destroyPost, deleteType:`post` },
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
      .catch(_ => {
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



  //Delete comment
  // useEffect(_=>{
  //   if(destroyComment === null) {
  //     return
  //   }
  //   setLoading(true)
  //   axios.delete(`${SERVER_URL}/posts`, delCommentConfig)
  //   .then(res => {
  //     dispatchPosts(a.deleteComment(destroyComment))
  //     addMessage(res.data.message)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  //   .finally(_=>{
  //     setLoading(false)
  //   })

  // }, [destroyComment])


  //Delete a post
  useEffect(
    _ => {
      if (destroyPost === null) {
        return
      }
      setLoading(true)
      axios
        .delete(`${SERVER_URL}/posts`, delPostConfig)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          setDestroyPost(null)
          setLoading(false)
        })
      console.log(destroyPost)
    },
    [destroyPost]
  )

  return { setStorePost, setDestroyPost, loading, setLoading }
}

export default usePost
