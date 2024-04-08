import React, { useContext, useEffect, useRef, useState } from "react"
import useComments from "../../Hooks/useComments"
import { Authorization } from "../../Contexts/Authorization"
import Navigation from "../Components/Navigation"
import NavigationUser from "../Components/NavigationUser"
import SearchBar from "./SearchBar"

function Layout() {
  const { user } = useContext(Authorization)
  const [offset, setOffset] = useState(false)
  const [displayDropdown, setDisplayDropdown] = useState(false)
  const [tags, setTags] = useState([])

const closeDropdown = e =>{
    setDisplayDropdown(false)
}

const openDropdown = e =>{
    e.stopPropagation()
    setDisplayDropdown(true)
}

useEffect(_=>{
    console.log(tags)
}, [tags])



  useEffect(_ => {
    window.onscroll = _ => {
      if (window.scrollY > 0) {
        setOffset(true)
      } else {
        setOffset(false)
      }
    }
  }, [])
  return (
    <div onClick={e => closeDropdown(e)} className="search-page">
      {user ? <NavigationUser offset={offset} /> : <Navigation offset={offset} />}
      <div className="search-page-body">
        <SearchBar
          setDisplayDropdown={setDisplayDropdown}
          displayDropdown={displayDropdown}
          openDropdown={openDropdown}
          setTags={setTags}
          tags={tags}
        />
      </div>
    </div>
  )
}

export default Layout