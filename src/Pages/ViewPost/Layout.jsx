import React, { useContext, useState, useEffect } from 'react'
import { Authorization } from '../../Contexts/Authorization'
import { Post } from '../../Contexts/Post'
import SideNavUser from '../Components/SideNavUser'
import ViewPostBody from './ViewPostBody'
import { Router } from '../../Contexts/Router'

function Layout() {

    const {user} = useContext(Authorization)
    const {params} = useContext(Router)
    const {posts} = useContext(Post)

    const [currentItem, setCurrentItem] = useState(null)

    useEffect(
        _ => {
            console.log(`useEffect trigger`)
          if (posts.length !== 0) {
            const currPost = posts.find(f => f._id === params[0])
            if (!currPost) {
              setCurrentItem(null)
            } else {
              setCurrentItem(currPost)
            }
          }
        },
        [posts, params[0]]
      )


      if(currentItem === null){
        return null
      }

  return (
    <div className='view-page'>
        <SideNavUser />
        <div className="view-content">
            <ViewPostBody currentItem={currentItem}/>
        </div>
         {/* <SideNavUser /> */}

    </div>
  )
}

export default Layout
