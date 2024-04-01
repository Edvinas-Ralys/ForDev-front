import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { SERVER_URL } from "../Data/main"
import { Router } from "../Contexts/Router"
import { Messages } from "../Contexts/Messages"

function useSignup() {
  const [signUpInfo, setSignUpInfo] = useState(null)
  const { setErrorPageType, setLoading } = useContext(Router)
  const { addMessage } = useContext(Messages)

  useEffect(
    _ => {
      if (signUpInfo === null) {
        return
      }
      // setLoading(true)
      axios
        .post(`${SERVER_URL}/users`, { ...signUpInfo, roles: [`user`] }, { withCredentials: true })
        .then(res => {
          console.log(res.data)
          // window.location.href = `#login`
        })
        .catch(err => {
          console.log(err)
          if (err.code === `ERR_NETWORK`) {
            setErrorPageType(`network_err`)
          } else if (err?.response?.status === 403 && err?.response?.data.type === `validation`) {
            addMessage(`Validation error`)
          } else if (err?.response?.status === 500 && err?.response?.data.type === `databse`) {
            addMessage(`Database error`)
          } else if (err?.response?.status === 409) {
            addMessage({
              text: `Email is already used`,
              type: `error`,
              location: `sign-up`,
              cause: `email`,
            })
          } else if (err?.response?.status === 400) {
            addMessage({
              text: `All fields are required`,
              type: `error`,
              location: `sign-up`,
              cause: `fields`,
            })
          }
        })
        .finally(_ => {
          setLoading(false)
          setSignUpInfo(null)
        })
    },
    [signUpInfo]
  )

  return { setSignUpInfo }
}

export default useSignup
