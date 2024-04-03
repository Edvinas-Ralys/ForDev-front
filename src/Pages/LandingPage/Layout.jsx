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

  // const changeLetter = useCallback(text => {
  //   let iterations = 0
  //   const interval = setInterval(_ => {
  //     text.innerText = text.innerText
  //       .split(``)
  //       .map((letter, i) => {
  //         if (i < iterations) {
  //           return text.dataset.value[i]
  //         } else {
  //           return letters[Math.floor(Math.random() * 26)]
  //         }
  //       })
  //       .join(``)
  //     if (iterations >= text.dataset.value.length) clearInterval(interval)
  //     iterations += 1 / 3
  //   }, 120)
  // }, [])

  // useEffect(
  //   _ => {
  //     changeLetter(first.current)
  //     changeLetter(second.current)
  //     changeLetter(third.current)
  //     const interval = setInterval(_ => {
  //       if (iterationsCount === 2) {
  //         setIterationCount(0)
  //       } else {
  //         setIterationCount(iterationsCount + 1)
  //       }
  //     }, 5000)
  //     // clearInterval(interval)
  //   },
  //   [iterationsCount]
  // )

  return (
    <>

      <div ref={main} className="landing-page">
      {user ? <NavigationUser offset={offset} setComponentToScroll={setComponentToScroll} /> : <Navigation offset={offset}  />}
        <Banner imgStyles={imgStyles}  />
        {/* <div className="background">
          <div
            className="image-container"
            style={{transform: `translateY(${imgStyles.backgroundParalax}px)`, scale:`${imgStyles.backgroundScale}`  }}
          >
            <img src={`${SERVER_URL}/front-images/html-bg.jpg`} alt="" />
          </div>
        </div>
        <div
          className="landing-page-text"
        >
          <div className="static-text">
            <div className="text">Welcome to our Web Dev Community</div>
            <div className="sub-text">Connect with web developers from all around the world</div>
          </div>
          <div className="changing-letters"></div>
          <div className="changing-letters">
            <div
              data-value={`${firstWord[iterationsCount]}`}
              className="changing-text"
              ref={first}
              value={firstWord[iterationsCount]}
            >
              {firstWord[iterationsCount]}
            </div>
            <div
              ref={second}
              data-value={`${secondWord[iterationsCount]}`}
              className="changing-text"
            >
              {secondWord[iterationsCount]}
            </div>
            <div ref={third} data-value={`${thirdWord[iterationsCount]}`} className="changing-text">
              {thirdWord[iterationsCount]}
            </div>
          </div>
        </div> */}
      </div>
      <Explore explore={explore}/>
    </>
  )
}

export default Layout
