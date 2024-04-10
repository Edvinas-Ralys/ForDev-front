import React, { useContext } from "react"
import SliderCard from "./SliderCard"
import { Post } from "../../Contexts/Post"
import { Chevron } from "../../Icons/Icons"

function Slider() {
  const { posts, setGetNumberOfPosts, getNumberOfPosts, totalCount } = useContext(Post)
  const getNextPosts = _ => {
    if (totalCount > getNumberOfPosts.skip + 7) {
      setGetNumberOfPosts(prev => ({ ...prev, skip: prev.skip + 7 }))
    }
  }
  const getPrevPosts = _ => {
    if (getNumberOfPosts.skip !== 0) {
      setGetNumberOfPosts(prev => ({ ...prev, skip: prev.skip - 7 }))
    }
  }
  return (
    <div className="slider-container">
      <div className="title">
        Explore trending posts
        <div className="buttons">
          <div
            onClick={getPrevPosts}
            className={`chevron-left-wrapper ${
              getNumberOfPosts.skip === 0 ? `disabled-cheveron` : ``
            }`}
          >
            <Chevron />
          </div>
          <div
            onClick={getNextPosts}
            className={`chevron-right-wrapper ${
              totalCount <= getNumberOfPosts.skip + 7 ? `disabled-cheveron` : ``
            }`}
          >
            <Chevron />
          </div>
        </div>
      </div>
      <div className="slider">
        {posts.map((postItem, i) => (
          <SliderCard key={i} postItem={postItem} count={i} />
        ))}
      </div>
    </div>
  )
}

export default Slider
