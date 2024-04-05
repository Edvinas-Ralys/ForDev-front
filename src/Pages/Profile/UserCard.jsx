import React from "react"
import { SERVER_URL } from "../../Data/main"
import { Cog } from "../../Icons/Icons"

function UserCard() {
  return (
    <div className="user">
      <div className="user-container">
        <div className="picture">
          <img src={`${SERVER_URL}/images/placeholder.jpg`} alt="" />
        </div>
        <div className="username">Edvinas</div>
        <div className="bio">
          Experienced web developer adept in HTML, CSS, JavaScript, and frameworks. Passionate about
          creating seamless user interfaces and staying updated with latest technologies seamless
          user interfaces and staying updated with latest technologies
        </div>
        <div className="interests"> html javascript security SEO web development</div>
        <div className="bottom">
          <Cog />
          <div className="logout">Logout</div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
