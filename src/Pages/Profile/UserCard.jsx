import React, { useContext } from "react"
import { SERVER_URL } from "../../Data/main"
import { Authorization } from "../../Contexts/Authorization"
import { Router } from "../../Contexts/Router"
import { Profile } from "../../Contexts/Profile"

function UserCard({ setCreateBio, setChangePicture, setRemoveBio }) {
  const { params } = useContext(Router)
  const { user } = useContext(Authorization)
  const { profile,} = useContext(Profile)
  const handleCreateBio = _ => {
    if (!profile?.userDetails?.bio || profile?.userDetails?.bio === ``) {
      setCreateBio(``)
    } else {
      setCreateBio(profile?.userDetails?.bio)
    }
  }

  const handleChangePicture = _ => {
    setChangePicture({ picture: profile.userDetails.picture })
  }

  const handleClearBio = _ =>{
    setRemoveBio({userId:user.id, updateType:`remove-bio`})
  }

  return (
    <div className="user">
      <div className="user-container">
        <div className="picture">
          <div className="image-wrapper">
            {!profile.userDetails.picture ? (
              <img src={`${SERVER_URL}/images/avatr-placeholder.png`} alt="" />
            ) : (
              <img src={`${SERVER_URL}/images/${profile.userDetails.picture}`} alt="" />
            )}
          </div>
          <div onClick={handleChangePicture} className="image-button">
            Change picture
          </div>
        </div>
        <div className="group">
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
            {
              <div className="bio-buttons">
                {typeof profile.userDetails.bio === `string` ? (
                  <div className="double">
                    <div className="update-button" onClick={handleCreateBio}>
                      Update
                    </div>
                    <div onClick={handleClearBio} className="clear-button">Clear</div>
                  </div>
                ) : profile.userDetails.bio === null ? (
                  <button onClick={handleCreateBio}>Add bio</button>
                ) : (
                  ``
                )}
              </div>
            }
          </div>
          {user && params[0] === user.id && (
            <div className="bottom">
              <div className="logout">Logout</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserCard
