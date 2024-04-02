import React, { useEffect, useState, useRef, useCallback, useContext } from "react"
import Navigation from "../Components/Navigation"
import NewUserCard from "./Explore"
import { Authorization } from "../../Contexts/Authorization"
import NavigationUser from "../Components/NavigationUser"

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
      {!user ? <Navigation /> : <NavigationUser />}
      <div className="landing-page">
        {!user && <NewUserCard />}
        <div
          style={{ top: `${4 * (squareSize + 7)}px`, left: `${4 * (squareSize + 12)}px` }}
          className="landing-page-text"
        >
          <div className="static-text">
            <div className="text">Welcome to our</div>
            <div className="text">Web Dev Community</div>
          </div>
          <div className="changing-letters">
            <div
              data-value={`${firstWord[iterationsCount]}`}
              className="unite"
              ref={first}
              value={firstWord[iterationsCount]}
            >
              {firstWord[iterationsCount]}
            </div>
            <div ref={second} data-value={`${secondWord[iterationsCount]}`} className="code">
              {secondWord[iterationsCount]}
            </div>
            <div ref={third} data-value={`${thirdWord[iterationsCount]}`} className="inspire">
              {thirdWord[iterationsCount]}
            </div>
          </div>
        </div>
        {user && <button className="create-post"><a href="#create-post">Create a Post</a></button>}

      </div>
    </>
  )
}

export default Layout
