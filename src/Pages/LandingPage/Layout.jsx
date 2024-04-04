import React, { useEffect, useState, useRef, useCallback, useContext } from "react"
import Navigation from "../Components/Navigation"
import { Authorization } from "../../Contexts/Authorization"
import NavigationUser from "../Components/NavigationUser"
import { SERVER_URL } from "../../Data/main"
import Explore from "./Explore"
import Banner from "./Banner"

function Layout() {
  const { user } = useContext(Authorization)
  const letters = "QWERTYUIOPASDFGHJKLZXCVBNM"
  const [offset, setOffset] = useState(false)
  const [imgStyles, setImgStyles] = useState({
    backgroundParalax:0,
    backgroundScale:1
  })
  const [componentToScroll, setComponentToScroll] = useState(null)
  const explore = useRef()
  const main = useRef()



  useEffect(_ => {
    window.onscroll = _ => {
      if (window.scrollY < 500) {
        setImgStyles(prev => ({...prev, backgroundParalax:(-window.scrollY / 3)}))
        setImgStyles(prev => ({...prev,  backgroundScale:(1- window.scrollY / 6000)}))
      }
      if (window.scrollY > 0) {
        setOffset(true)
      } else {
        setOffset(false)
      }
    }
  }, [])

  useEffect(_=>{
    if(componentToScroll !== null){
      if(componentToScroll === `explore`){
        explore.current.scrollIntoView({ behavior: "smooth" })
      } else if (componentToScroll === `main`){
        main.current.scrollIntoView({ behavior: "smooth" })
      }
      setComponentToScroll(null)
    }

  }, [componentToScroll])



  return (
    <>

      <div ref={main} className="landing-page">
      {user ? <NavigationUser offset={offset} setComponentToScroll={setComponentToScroll} /> : <Navigation offset={offset}  />}
        <Banner imgStyles={imgStyles}  />
      </div>
      <Explore explore={explore}/>
    </>
  )
}

export default Layout
