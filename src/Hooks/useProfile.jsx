import React, { useContext, useState } from 'react'
import { Router } from '../Contexts/Router'

function useProfile() {
const [getProfile, setGetProfile] = useState(null)
const {params} = useContext(Router)




  return {
    setGetProfile
  }
}

export default useProfile
