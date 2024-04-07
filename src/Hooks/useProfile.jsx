import React, { useContext, useEffect, useState } from "react"
import { Router } from "../Contexts/Router"
import { SERVER_URL } from "../Data/main"
import axios from "axios"
import { Authorization } from "../Contexts/Authorization"
import { Messages } from "../Contexts/Messages"
import usePost from "./usePost"

function useProfile() {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const [updateProfile, setUpdateProfile] = useState(null)
  const { addMessage } = useContext(Messages)
  const [getProfile, setGetProfile] = useState(null)
  const { user } = useContext(Authorization)
  const {destroyPost} = usePost


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
            addMessage(err.response.data.message)
          })
          .finally(_ => {
            setLoading(false)
          })
      }
    },
    [getProfile]
  )

  useEffect(
    _ => {
      if (updateProfile === null) {
        return
      }
      setLoading(true)
      const headers = { Authorization: `Bearer ${user.token}` }
      axios
        .patch(`${SERVER_URL}/user`, updateProfile, headers)
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
          }
        })
        .catch(err => {
          addMessage(err.response.data.message)
        })
        .finally(_ => {
          setLoading(false)
          setUpdateProfile(null)
        })
    },
    [updateProfile]
  )

  return {
    setGetProfile,
    loading,
    profile,
    setUpdateProfile,
  }
}

export default useProfile
