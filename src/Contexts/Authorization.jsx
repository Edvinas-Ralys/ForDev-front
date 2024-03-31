import { createContext, useState } from "react"
import { MessagerProvider } from "./Messages"

export const Authorization = createContext()

export const AuthorizationProvider = ({ children }) => {
  //*User state from local storage. If there is no token and user then null
  const [user, setUser] = useState(_ => {
    const firstName = window.localStorage.getItem(`firstName`)
    const lastName = window.localStorage.getItem(`lastName`)
    const role = window.localStorage.getItem(`role`)
    const id = window.localStorage.getItem(`id`)
    const token = window.localStorage.getItem(`token`)
    return firstName
      ? {
        firstName,
        lastName,
          role,
          id,
          token
        }
      : null
  })

  const [doLogout, setDoLogout] = useState(false)

  //*Sets user and token to lacal storage
  const login = (firstName, lastName, role, id, token) => {
    window.localStorage.setItem(`firstName`, firstName)
    window.localStorage.setItem(`lastName`, lastName)
    window.localStorage.setItem(`role`, role)
    window.localStorage.setItem(`id`, id)
    window.localStorage.setItem(`token`, token)
    setUser({ firstName, lastName,  role, id, token })
  }

  return (
    <Authorization.Provider value={{ user, setUser, login, doLogout, setDoLogout }}>
      <MessagerProvider>{children}</MessagerProvider>
    </Authorization.Provider>
  )
}
