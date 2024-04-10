import axios from "axios"
import React, { useEffect, useState, useContext } from "react"
import { SERVER_URL } from "../Data/main"
import { Authorization } from "../Contexts/Authorization"
import { Messages } from "../Contexts/Messages"

function useSearch() {
  const { user } = useContext(Authorization)
  const [searchParams, setSearchParams] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const { addMessage } = useContext(Messages)
  const [loading, setLoading] = useState(false)
  const getConfig = {
    headers: { Authorization: `Bearer ${user?.token}` },
    params: searchParams,
  }

  useEffect(
    _ => {
      if (searchParams === null) return
      setLoading(true)
      axios
        .get(`${SERVER_URL}/search`, getConfig)
        .then(res => {
          setSearchResults(res.data)
        })
        .catch(err => {
          addMessage(err.response.data.message)
        })
        .finally(_ => {
          setLoading(false)
        })
    },
    [searchParams]
  )

  return { setSearchParams, searchResults, loading }
}

export default useSearch
