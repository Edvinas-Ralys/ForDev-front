import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { SERVER_URL } from "../Data/main"
import { Authorization } from "../Contexts/Authorization"
import { Messages } from "../Contexts/Messages"

function useSearch() {
  const { user } = useContext(Authorization)
  const [searchParams, setSearchParams] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const { addMessage } = useContext(Messages)
  const [loading, setLoading] = useState(false)
  const [getConfig, setGetConfig] = useState({
    headers: { Authorization: `Bearer ${user?.token}` },
    params: null,
  })

  useEffect(
    _ => {
      if (searchParams !== null) {
        setGetConfig(prev => ({ ...prev, params: searchParams }))
      }
    },
    [searchParams, setGetConfig]
  )

  useEffect(
    _ => {
      if (searchParams === null || !getConfig.params || getConfig.params === null  ){
        return
      }
      setLoading(true)
      axios
        .get(`${SERVER_URL}/search`, getConfig)
        .then(res => {
          setSearchResults(res.data)
        })
        .catch(err => {
          if (err.response?.status) {
            addMessage(err.response.data.message)
          } else {
            window.location.href = `#network-error`
          }
        })
        .finally(_ => {
          setLoading(false)
          setGetConfig(prev => ({...prev, params:null}))
          setSearchParams(null)
        })
    },
    [searchParams, setLoading, setSearchResults, addMessage, getConfig]
  )

  return { setSearchParams, searchResults, loading }
}

export default useSearch
