import { createContext, useReducer } from "react"
import useProfile from "../Hooks/useProfile"
import profileReducer from "../Reducers/profileReducer"
import useImage from "../Hooks/useImage"

export const Profile = createContext()
export const ProfileProvider = ({ children }) => {
  const { image, setImage, readImage } = useImage()

  const { setGetProfile, loading, profile, setUpdateProfile } = useProfile()

  return (
    <Profile.Provider value={{ profile, setGetProfile, loading, setUpdateProfile, image, setImage, readImage }}>
      {children}
    </Profile.Provider>
  )
}
