import React, { useEffect, useState, useRef, useCallback, useContext } from "react"
import Navigation from "../Components/Navigation"
import NewUserCard from "./Explore"
import { Authorization } from "../../Contexts/Authorization"
import NavigationUser from "../Components/NavigationUser"
import { SERVER_URL } from "../../Data/main"

function Layout() {
  const { user } = useContext(Authorization)
  const [firstWord, setFirstWord] = useState([`UNITE`, `UNIFY`, `COLLAB`])
  const [secondWord, setSecondWord] = useState(["CODE", "LEARN", "ADAPT"])
  const [thirdWord, setThirdWord] = useState(["INSPIRE", "ENCOURAGE", "EMPOWER"])
  const [iterationsCount, setIterationCount] = useState(0)
  const letters = "QWERTYUIOPASDFGHJKLZXCVBNM"
  const first = useRef()
  const second = useRef()
  const third = useRef()
  const squareSize = 40
  const [totalIterations, setTotalIterations] = useState(0)
  const [offset, setOffset] = useState(false)

  useEffect(_ => {
    window.onscroll = _ => {

      if (window.scrollY > 0) {
        setOffset(true)
      } else {
        setOffset(false)
      }
    }
  }, [])

  const changeLetter = useCallback(text => {
    let iterations = 0
    const interval = setInterval(_ => {
      text.innerText = text.innerText
        .split(``)
        .map((letter, i) => {
          if (i < iterations) {
            return text.dataset.value[i]
          } else {
            return letters[Math.floor(Math.random() * 26)]
          }
        })
        .join(``)
      if (iterations >= text.dataset.value.length) clearInterval(interval)
      iterations += 1 / 3
    }, 120)
  }, [])

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
      {user ? <NavigationUser offset={offset} /> : <Navigation offset={offset} />}
      <div className="landing-page">
      <div className="background">
          <img src={`${SERVER_URL}/front-images/nebula.jpg`} alt="" />
        </div>
        <div
          // style={{ top: `${4 * (squareSize + 7)}px`, left: `${4 * (squareSize + 12)}px` }}
          className="landing-page-text"
        >

          <div className="static-text">
            <div className="text">Welcome to our Web Dev Community</div>
            <div className="sub-text">
              Connect with web developers from all around the world
            </div>
          </div>
          <div className="changing-letters">

          </div>
          <div className="changing-letters">
            <div
              data-value={`${firstWord[iterationsCount]}`}
              className="changing-text"
              ref={first}
              value={firstWord[iterationsCount]}
            >
              {firstWord[iterationsCount]}
            </div>
            <div ref={second} data-value={`${secondWord[iterationsCount]}`} className="changing-text">
              {secondWord[iterationsCount]}
            </div>
            <div ref={third} data-value={`${thirdWord[iterationsCount]}`} className="changing-text">
              {thirdWord[iterationsCount]}
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default Layout
