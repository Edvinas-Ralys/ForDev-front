import React, { useContext } from "react"
import { SERVER_URL } from "../../Data/main"
import { Profile } from "../../Contexts/Profile"

function ViewUserCard({setChangePicture}) {
  const { profile } = useContext(Profile)

  return (
    <div className="user">
      <div className="user-container">


      <div className="picture">
          <div className="image-wrapper">
            {!profile.userDetails.picture || profile.userDetails.picture === null ? (
              <img src={`${SERVER_URL}/images/avatr-placeholder.png`} alt="" />
            ) : <img src={`${SERVER_URL}/images/${profile.userDetails.picture}`} alt="" />}
          </div>
        </div>

        <div className="username">{profile?.userDetails?.username}</div>
        <div className="bio">
          {profile.userDetails.bio ? (
            <>
              <div className="bio-title">About</div>
              <div className="bio-text">{profile.userDetails.bio}</div>
            </>
          ) : (
            ``
          )}
          <div className="interests"></div>
        </div>
      </div>
    </div>
  )
}

export default ViewUserCard
