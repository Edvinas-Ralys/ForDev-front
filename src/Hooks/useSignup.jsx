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
      setLoading(true)
      axios
        .post(`${SERVER_URL}/user`, { ...signUpInfo, roles: [`user`] }, { withCredentials: true })
        .then(res => {
          window.location.href = `#login`
          addMessage(res.data.message)
        })
        .catch(err => {
          console.log(err)
          if (err.code === `ERR_NETWORK`) {
            setErrorPageType(`network_err`)
          } else if (err?.response?.status === 403 && err?.response?.data.type === `validation`) {
            addMessage(`Validation error`)
          } else if (err?.response?.status === 500 && err?.response?.data.type === `databse`) {
            addMessage({text:`Database error`, type:`error`, location:`sign-up`, cause:`db`})
          } else if (err?.response?.status === 409) {
            addMessage(err.response.data.message)
          } else if (err?.response?.status === 400){
            addMessage(err.response.data.message)
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
