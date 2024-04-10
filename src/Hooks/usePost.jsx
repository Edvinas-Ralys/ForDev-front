import React, { useContext, useEffect, useState } from "react"
import { Authorization } from "../Contexts/Authorization"
import { Messages } from "../Contexts/Messages"
import axios from "axios"
import { SERVER_URL } from "../Data/main"
import * as a from "../Actions/postActions"

function usePost(dispatchPosts) {
  const { user } = useContext(Authorization)
  const { addMessage } = useContext(Messages)
  const [storePost, setStorePost] = useState(null)
  const [destroyPost, setDestroyPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(null)
  const [editPost, setEditPost] = useState(null)
  const [updatePost, setUpdatePost] = useState(null)
  const [getNumberOfPosts, setGetNumberOfPosts] = useState({
    limit: 7,
    skip: 0,
  })
  let delPostConfig = {
    data: destroyPost,
    headers: { Authorization: `Bearer ${user?.token}` },
  }

  useEffect(
    _ => {
      if (editPost !== null && window.location.href !== `#edit-post`) {
        window.location.href = `#edit-post`
      }
    },
    [editPost]
  )

  //!Get all posts
  //!Finished
  useEffect(
    _ => {
      setLoading(true)
      axios
        .get(`${SERVER_URL}/posts`, { params: getNumberOfPosts })
        .then(res => {
          dispatchPosts(a.getPosts(res.data.posts))
          setTotalCount(res.data.totalCount)
          console.log(res.data)
        })
        .catch(_ => {
          window.location.href = `#network-error`
        })
        .finally(_ => {
          setLoading(false)
        })
    },
    [getNumberOfPosts]
  )

  //!Create post
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
          dispatchPosts(a.createPost(res.data.postResponse))
          addMessage(res.data.message)
          window.location.href = `#view/${res.data.postResponse._id}`
        })
        .catch(err => {
          if (err.response.status) {
            addMessage(err.response.data.message)
          } else {
            window.location.href = `#network-error`
          }
        })
        .finally(_ => {
          setLoading(false)
          setStorePost(null)
        })
    },
    [storePost]
  )

  //Delete a post
  useEffect(
    _ => {
      if (destroyPost === null) {
        return
      }
      console.log(destroyPost)
      setLoading(true)
      axios
        .delete(`${SERVER_URL}/posts`, delPostConfig)
        .then(res => {
          dispatchPosts(a.destroyPost(destroyPost))
          if (window.location.hash.split(`/`).shift() === `#profile`) {
            window.location.reload()
          } else {
            window.location.href = `#home`
          }

          addMessage(res.data.message)
        })
        .catch(err => {
          if (err.response.status) {
            addMessage(err.response.data.message)
          } else {
            window.location.href = `#network-error`
          }
        })
        .finally(_ => {
          setDestroyPost(null)
          setLoading(false)
        })
    },
    [destroyPost]
  )


  //Update Post
  useEffect(_=>{
    if(updatePost === null){
      return
    }
    const headers = { Authorization: `Bearer ${user.token}` }
    setLoading(true)
    axios.patch(`${SERVER_URL}/posts`, updatePost, {headers:headers} )
      .then(res => {
        console.log(res.data)
        dispatchPosts(a.updatePost(res.data.post))
        addMessage(res.data.message)
        window.location.href = `#profile/${user.id}`
      })
      .catch(err => {
        console.log(err)
        if(err.response.status){
          addMessage(err.response.data.message)
        } else {
          window.location.href = `#network-error`
        }

      })
      .finally(_=>{
        setLoading(false)
        setUpdatePost(null)
      })
  }, [updatePost])

  return {
    setStorePost,
    setDestroyPost,
    loading,
    setLoading,
    setGetNumberOfPosts,
    getNumberOfPosts,
    totalCount,
    setEditPost,
    editPost,
    setUpdatePost
  }
}

export default usePost
