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
  const [newPost, setNewPost] = useState({
    title: ``,
    text: ``,
    tags: [],
    image: ``,
  })
  const [storeComment, setStoreComment] = useState(null)

  useEffect(
    _ => {
      if (storePost === null) {
        return
      }
      const headers = { Authorization: `Bearer ${user.token}` }
      axios
        .post(
          `${SERVER_URL}/posts`,
          { ...storePost, userId: user.id, createdBy: user.username },
          { headers: headers }
        )
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    [storePost]
  )

  useEffect(_ => {
    axios
      .get(`${SERVER_URL}/posts`)
      .then(res => {
        console.log(res.data)
        dispatchPosts(a.getPosts(res.data.posts))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  useEffect(_=>{
    if(storeComment === null){
      return
    }
    const headers = { Authorization: `Bearer ${user.token}` }
    axios.patch(`${SERVER_URL}/posts`, storeComment, { headers: headers })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    // console.log(storeComment)
  }, [storeComment])

  return { setStorePost, setStoreComment }
}

export default usePost
