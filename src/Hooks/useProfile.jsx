import React, { useContext, useEffect, useState } from 'react'
import { Router } from '../Contexts/Router'
import { SERVER_URL } from '../Data/main'
import axios from 'axios'

function useProfile() {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState(null)
const [getProfile, setGetProfile] = useState(null)

  useEffect(_=>{
    if(getProfile !== null){
      setLoading(true)
      axios.get(`${SERVER_URL}/user`, {params:getProfile})
        .then(res => {
          setProfile(res.data)
          // console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(_=>{
          setLoading(false)
        })
    }
  }, [getProfile])


  return {
    setGetProfile, loading, profile
  }
}

export default useProfile
