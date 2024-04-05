import { useContext, useEffect, useState } from "react"
import { Authorization } from "../Contexts/Authorization"
import { Messages } from "../Contexts/Messages"
import axios from "axios"
import { SERVER_URL } from "../Data/main"
import * as a from "../Actions/commentActions"
import { Router } from "../Contexts/Router"

function useComments(dispatchComments) {
  const { user } = useContext(Authorization)
  const { addMessage } = useContext(Messages)

  const [storeComment, setStoreComment] = useState(null)
  const [destroyComment, setDestroyComment] = useState(null)
  const [getComments, setGetComments] = useState(null)

  const [loading, setLoading] = useState(false)

  useEffect(
    _ => {
      if (storeComment === null) {
        return
      }
      setLoading(true)
      // console.log(storeComment)
      const headers = { Authorization: `Bearer ${user.token}` }
      axios
        .post(`${SERVER_URL}/comment`, storeComment, { headers: headers })
        .then(res => {
          console.log(res.data)
          dispatchComments(a.addComment(res.data))
          addMessage(res.data.message)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_ => {
          setStoreComment(null)
          setLoading(false)
        })
      // console.log(storeComment)
    },
    [storeComment]
  )

  useEffect(
    _ => {
      if (getComments === null) {
        return
      }
      console.log(getComments)
      axios
        .get(`${SERVER_URL}/comment`, { params: getComments })
        .then(res => {
          dispatchComments(a.getComments(res.data.comments))
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    [getComments]
  )

  return { setStoreComment, setDestroyComment, setGetComments }
}

export default useComments
