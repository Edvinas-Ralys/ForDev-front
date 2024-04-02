import React, { useContext, useEffect, useState } from "react"
import { Authorization } from "../Contexts/Authorization"
import { Messages } from "../Contexts/Messages"
import axios from "axios"
import { SERVER_URL } from "../Data/main"

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

  return { setStorePost }
}

export default usePost
