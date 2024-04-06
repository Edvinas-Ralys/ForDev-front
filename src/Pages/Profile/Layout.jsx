import React, { useContext } from 'react'
import NavigationUser from '../Components/NavigationUser'
import UserCard from './UserCard'
import History from './History'
import { Authorization } from '../../Contexts/Authorization'
import Navigation from '../Components/Navigation'

function Layout() {
  const {user} = useContext(Authorization)
  return (
    <div className='profile'>
        {user ? <NavigationUser /> : <Navigation />}
        <div className="profile-container">
            <UserCard />
            <History />
        </div>
    </div>
  )
}

export default Layout
