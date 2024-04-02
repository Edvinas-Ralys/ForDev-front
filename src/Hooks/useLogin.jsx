import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { SERVER_URL } from "../Data/main"
import { Authorization } from "../Contexts/Authorization"
import { Router } from "../Contexts/Router"
import { Messages } from "../Contexts/Messages"

function useLogin() {
  const { login } = useContext(Authorization)
  const { setErrorPageType, setLoading } = useContext(Router)
  const { addMessage } = useContext(Messages)
  const { setUser } = useContext(Authorization)
  const [loginInfo, setloginInfo] = useState(null)

  useEffect(
    _ => {
      if (loginInfo === null) {
        return
      }
      setLoading(true)
      axios
        .post(`${SERVER_URL}/auth`, loginInfo, { withCredentials: true })
        .then(res => {
          login(
            res.data.user.username,
            res.data.user.role,
            res.data.user.id,
            res.data.accessToken
          )
          addMessage(res.data.message)
          window.location.href = `#home`
        })
        .catch(err => {
          if (err.code === `ERR_NETWORK`) {
            setErrorPageType(`network_err`)
          } else if (err?.response?.status === 400) {
            //All fields required
            addMessage(err.response.data.message)
          } else if (err?.response?.status === 401) {
            //No user found
            if (err?.response?.data.message.cause === `user`) {
              addMessage(err.response.data.message)
              //Invalid username or password
            } else if (err?.response?.data.message.cause === `invalid-input`) {
              addMessage(err.response.data.message)
            } else
              addMessage({
                text: `Unauthorized`,
                type: `error`,
                location: `login`,
                cause: `unauthorized`,
              })
          } else if (err?.response?.status === 403) {
            addMessage({ text: `Forbidden`, type: `error`, location: `login`, cause: `forbidden` })
          } else if (err?.response?.status === 429) {
            addMessage({
              text: `Too many request. Please try again in 60 seconds`,
              type: `error`,
              location: `login`,
              cause: `requests`,
            })
          }
        })
        .finally(_ => {
          setLoading(false)
          setloginInfo(null)
        })
    },
    [loginInfo]
  )

  const logout = _ => {
    window.location.href = `#home`
    setLoading(true)
    axios
      .post(`${SERVER_URL}/auth/logout`, {}, { withCredentials: true })
      .then(res => {
        window.localStorage.removeItem(`username`)
        window.localStorage.removeItem(`role`)
        window.localStorage.removeItem(`id`)
        window.localStorage.removeItem(`token`)
        setUser(null)
      })
      .catch(err => {
        if (err.code === `ERR_NETWORK`) {
          setErrorPageType(`network_err`)
        } else if (err?.response?.status === 403 && err?.response?.data.type === `email`) {
          addMessage({ text: `Email is already used`, type: `err` })
        } else if (err?.response?.status === 403 && err?.response?.data.type === `validation`) {
          addMessage(`Validation error`)
        } else if (err?.response?.status === 500 && err?.response?.data.type === `databse`) {
          addMessage(`Database error`)
        }
        console.log(err)
      })
      .finally(_ => {
        setLoading(false)
      })
  }

  return { setloginInfo, logout }
}

export default useLogin
