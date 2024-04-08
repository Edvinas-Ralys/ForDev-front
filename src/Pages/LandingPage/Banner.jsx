import React, { useEffect, useState, useRef, useCallback, useContext } from "react"
import { Authorization } from "../../Contexts/Authorization"
import { SERVER_URL } from "../../Data/main"

function Banner({imgStyles}) {
    const [firstWord, setFirstWord] = useState([`UNITE`, `UNIFY`, `COLLAB`])
    const [secondWord, setSecondWord] = useState(["CODE", "LEARN", "ADAPT"])
    const [thirdWord, setThirdWord] = useState(["INSPIRE", "ENCOURAGE", "EMPOWER"])
    const [iterationsCount, setIterationCount] = useState(0)
    const letters = "QWERTYUIOPASDFGHJKLZXCVBNM"
    const first = useRef()
    const second = useRef()
    const third = useRef()



  return (
    <div className='banner'>
              <div className="background">
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
        </div>
    </div>
  )
}

export default Banner
