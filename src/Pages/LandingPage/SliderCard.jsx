import React, { useContext, useState } from "react"
import { SERVER_URL } from "../../Data/main"
import { Comments } from "../../Icons/Icons"

function SliderCard({ postItem, count }) {
  const viewPost = _ => {
    window.location.href = `#view/${postItem._id}`
  }
  const [cardStyles, setCardStyle] = useState({
    0: `slider-card-big-one`,
    1: `slider-card-big-two`,
    2: `regular`,
    3: `regular`,
    4: `slider-bottom-left-double`,
    5: `slider-bottom-middle-double`,
    6: `slider-bottom-right-double`,
    7: `regular`,
    8: `regular`,
    9: `regular`,


  })

  return (
    <div onClick={viewPost} className={`slider-card ${cardStyles[count]} `}>
      <div className="slider-card-content">
        <div className="image-container">
          {postItem.image !== null ? (
            <img src={`${SERVER_URL}/images/${postItem.image}`} alt="" />
          ) : (
            <img src={`${SERVER_URL}/images/placeholder.jpg`} />
          )}

          <div className="slider-title">{postItem.title}</div>
          <div className="slider-info"></div>
        </div>
      </div>
    </div>
  )
}

export default SliderCard
