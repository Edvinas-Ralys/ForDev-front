import { useContext, useEffect, useState } from "react"
import { SERVER_URL } from "../Data/main"
import axios from "axios"
import { Authorization } from "../Contexts/Authorization"
import { Messages } from "../Contexts/Messages"

function useProfile() {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const [updateProfile, setUpdateProfile] = useState(null)
  const { addMessage } = useContext(Messages)
  const [getProfile, setGetProfile] = useState(null)
  const { user } = useContext(Authorization)

  useEffect(
    _ => {
      if (updateProfile !== null && !updateProfile.headers) {
        setUpdateProfile(prev => ({ ...prev, headers: { Authorization: `Bearer ${user.token}` } }))
      }
    },
    [updateProfile, setUpdateProfile, user]
  )

  useEffect(
    _ => {
      if (getProfile !== null) {
        setLoading(true)
        axios
          .get(`${SERVER_URL}/user`, { params: getProfile })
          .then(res => {
            setProfile(res.data)
          })
          .catch(err => {
            if(err.response?.status){
              addMessage(err.response.data.message)
            } else {
              window.location.href = `#network-error`
            }

          })
          .finally(_ => {
            setLoading(false)
          })
      }
    },
    [getProfile, setLoading, setProfile, addMessage]
  )

  useEffect(
    _ => {
      if (updateProfile === null || !updateProfile.headers) {
        return
      }
      setLoading(true)
      axios
        .patch(`${SERVER_URL}/user`, updateProfile, updateProfile.headers)
        .then(res => {
          addMessage(res.data.message)
          if (updateProfile.updateType === `bio`) {
            setProfile(prev => ({
              ...prev,
              userDetails: { ...prev.userDetails, bio: updateProfile.bio },
            }))
          } else if (updateProfile.updateType === `picture`) {
            setProfile(prev => ({
              ...prev,
              userDetails: { ...prev.userDetails, picture: res.data.newPicture },
            }))
          } else if (updateProfile.updateType === `picture-remove`) {
            setProfile(prev => ({
              ...prev,
              userDetails: { ...prev.userDetails, picture: null },
            }))
          } else if (updateProfile.updateType === `remove-bio`) {
            setProfile(prev => ({
              ...prev,
              userDetails: { ...prev.userDetails, bio: null },
            }))
          }
        })
        .catch(err => {
          if(err.response?.status){
            addMessage(err.response.data.message)
          } else {
            window.location.href = `#network-error`
          }
        })
        .finally(_ => {
          setLoading(false)
          setUpdateProfile(null)
        })
    },
    [updateProfile, setLoading, addMessage, setProfile]
  )

  return {
    setGetProfile,
    loading,
    profile,
    setUpdateProfile,
  }
}

export default useProfile
