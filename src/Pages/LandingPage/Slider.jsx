import React, { useContext } from "react"
import SliderCard from "./SliderCard"
import { Post } from "../../Contexts/Post"

function Slider() {
  const { posts } = useContext(Post)
  // console.log(posts[0][0])
  return (
    <div className="slider-container">
      <div className="title">Explore trending posts</div>
      <div className="slider">
        {posts.map((postItem, i) => (
          <SliderCard key={i} postItem={postItem} count={i} />
        ))}
      </div>
    </div>
  )
}

export default Slider
