import React, { useContext } from 'react'
import { SERVER_URL } from '../../Data/main'
import { Comments } from '../../Icons/Icons'

function SliderCard({postItem}) {

    const viewPost = _ =>{
        window.location.href = `#view/${postItem._id}`
    }

  return (
    <div onClick={viewPost} className='slider-card'>
        <div className="slider-card-content">
            <div className="image-container">
                <img src={`${SERVER_URL}/images/${postItem.image}`} alt="" />
                <div className="slider-title">
                    {postItem.title}
                </div>
                <div className="slider-info">
                    <div className="comments-display">
                        <Comments /> {postItem.comments.length}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SliderCard
