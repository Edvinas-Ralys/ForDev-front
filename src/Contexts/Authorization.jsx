import { createContext, useState } from "react"
import { MessagerProvider } from "./Messages"

export const Authorization = createContext()

export const AuthorizationProvider = ({ children }) => {
  //*User state from local storage. If there is no token and user then null
  const [user, setUser] = useState(_ => {
    const username = window.localStorage.getItem(`username`)
    const role = window.localStorage.getItem(`role`)
    const id = window.localStorage.getItem(`id`)
    const token = window.localStorage.getItem(`token`)
    return username
      ? {
        username,
          role,
          id,
          token
        }
      : null
  })

  const [doLogout, setDoLogout] = useState(false)

  //*Sets user and token to lacal storage
  const login = (username, role, id, token) => {
    window.localStorage.setItem(`username`, username)
    window.localStorage.setItem(`role`, role)
    window.localStorage.setItem(`id`, id)
    window.localStorage.setItem(`token`, token)
    setUser({ username,  role, id, token })
  }

  return (
    <Authorization.Provider value={{ user, setUser, login, doLogout, setDoLogout }}>
      <MessagerProvider>{children}</MessagerProvider>
    </Authorization.Provider>
  )
}
