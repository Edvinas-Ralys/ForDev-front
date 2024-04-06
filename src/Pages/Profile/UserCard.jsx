import React, { useContext } from "react"
import { SERVER_URL } from "../../Data/main"
import { Cog } from "../../Icons/Icons"
import { Authorization } from "../../Contexts/Authorization"
import { Router } from "../../Contexts/Router"
import { Profile } from "../../Contexts/Profile"

function UserCard() {
  const { params } = useContext(Router)
  const { user } = useContext(Authorization)
  const { profile } = useContext(Profile)
  console.log(params[0] === user.id)

  return (
    <div className="user">
      <div className="user-container">
        <div className="picture">
          <img src={`${SERVER_URL}/images/placeholder.jpg`} alt="" />
        </div>
        <div className="username">{profile?.userDetails?.username}</div>
        <div className="bio">
          {user &&
          user.id === params[0] &&
          (!profile?.userDetails?.bio || profile?.userDetails?.bio === ``) ? (
            <button>Create bio</button>
          ) : user && (profile?.userDetails?.bio || profile?.userDetails?.bio !== ``) ? (
            profile?.userDetails?.bio
          ) : (
            profile?.userDetails?.bio
          )}
        </div>
        <div className="interests">
          {user &&
          profile?.userDetails?.interests?.length === 0 &&
          profile?.userDetails?.userId === Number(user.id) ? (
            <button>Add interests</button>
          ) : !user ? (
            profile?.userDetails?.interests
          ) : (
            ``
          )}
        </div>
        {user && params[0] === user.id && (
          <div className="bottom">
            <div className="logout">Logout</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCard
