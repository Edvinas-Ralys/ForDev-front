import React from "react"
import Slider from "./Slider"

function Explore({explore}) {
  return (
    <div ref={explore} id="#explore" className="explore">
      <Slider />
    </div>
  )
}

export default Explore
