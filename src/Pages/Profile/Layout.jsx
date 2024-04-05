import React from 'react'
import NavigationUser from '../Components/NavigationUser'
import UserCard from './UserCard'
import History from './History'

function Layout() {
  return (
    <div className='profile'>
        <NavigationUser />
        <div className="profile-container">
            <UserCard />
            <History />
        </div>
    </div>
  )
}

export default Layout
