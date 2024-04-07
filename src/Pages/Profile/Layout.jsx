import React, { useContext, useEffect, useState } from "react"
import NavigationUser from "../Components/NavigationUser"
import UserCard from "./UserCard"
import History from "./History"
import { Authorization } from "../../Contexts/Authorization"
import { Router } from "../../Contexts/Router"
import Navigation from "../Components/Navigation"
import BioModal from "./BioModal"
import ViewUserCard from "./ViewUserCard"
import PictureModal from "./PictureModal"

function Layout() {
  const { user } = useContext(Authorization)
  const { params } = useContext(Router)
  const [createBio, setCreateBio] = useState(null)
  const [changePicture, setChangePicture] = useState(null)

  return (
    <div className="profile">
      {(createBio || createBio === ``) && (
        <BioModal setCreateBio={setCreateBio} createBio={createBio} />
      )}
      {user ? <NavigationUser /> : <Navigation />}
      <div className="profile-container">
        {user && user.id === params[0] && (
          <UserCard setCreateBio={setCreateBio} setChangePicture={setChangePicture} />
        )}
        {user.id !== params[0] && <ViewUserCard />}
        {changePicture && <PictureModal  setChangePicture={setChangePicture} changePicture={changePicture}/>}
        <History />
      </div>
    </div>
  )
}

export default Layout
