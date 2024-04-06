import React, { useContext, useState } from 'react'
import NavigationUser from '../Components/NavigationUser'
import UserCard from './UserCard'
import History from './History'
import { Authorization } from '../../Contexts/Authorization'
import Navigation from '../Components/Navigation'
import BioModal from './BioModal'

function Layout() {
  const {user} = useContext(Authorization)
  const [createBio, setCreateBio] = useState(null)
  return (
    <div className='profile'>
      {(createBio || createBio === ``) && <BioModal setCreateBio={setCreateBio} createBio={createBio}/>}
        {user ? <NavigationUser /> : <Navigation />}
        <div className="profile-container">
            <UserCard setCreateBio={setCreateBio}/>
            <History />
        </div>
    </div>
  )
}

export default Layout
