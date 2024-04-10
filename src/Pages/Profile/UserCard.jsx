import React, { useContext } from "react"
import { SERVER_URL } from "../../Data/main"
import { Cog } from "../../Icons/Icons"
import { Authorization } from "../../Contexts/Authorization"
import { Router } from "../../Contexts/Router"
import { Profile } from "../../Contexts/Profile"

function UserCard({ setCreateBio, setChangePicture }) {
  const { params } = useContext(Router)
  const { user } = useContext(Authorization)
  const { profile, image, setImage, readImage } = useContext(Profile)
  const handleCreateBio = _ => {
    if (!profile?.userDetails?.bio || profile?.userDetails?.bio === ``) {
      setCreateBio(``)
    } else {
      setCreateBio(profile?.userDetails?.bio)
    }
  }

  const handleChangePicture = _ => {
    setChangePicture({picture:profile.userDetails.picture})
  }

  return (
    <div className="user">
      <div className="user-container">
        <div className="picture">
          <div className="image-wrapper">
            {!profile.userDetails.picture ? (
              <img src={`${SERVER_URL}/images/avatr-placeholder.png`} alt="" />
            ) : <img src={`${SERVER_URL}/images/${profile.userDetails.picture}`} alt="" />}
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
                  <div className="clear-button">Clear</div>
                </div>
              ) : profile.userDetails.bio === undefined ? (
                <button onClick={handleCreateBio}>Add about</button>
              ) : (
                `nothng`
              )}
            </div>
          }

          {/* {user &&
          user.id === params[0] &&
          (!profile?.userDetails?.bio || profile?.userDetails?.bio === ``) ? (
            <button onClick={handleCreateBio}>Create bio</button>
          ) : user && (profile?.userDetails?.bio || profile?.userDetails?.bio !== ``) ? (
            <div className="bio-text">
              {profile?.userDetails?.bio}
              <div className="buttons">
                <button onClick={handleCreateBio}>Update bio</button>
                <button>Clear bio</button>
              </div>
            </div>
          ) : (
            <div className="bio-text">
              <div className="bio-title">Bio</div>
              {profile?.userDetails?.bio}
            </div>
          )} */}
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
