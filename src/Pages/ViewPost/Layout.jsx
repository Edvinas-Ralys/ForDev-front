import React, { useContext, useState, useEffect } from "react"
import { Authorization } from "../../Contexts/Authorization"
import { Post } from "../../Contexts/Post"
import SideNavUser from "../Components/SideNavUser"
import ViewPostBody from "./ViewPostBody"
import { Router } from "../../Contexts/Router"
import DeleteModal from "./DeleteModal"
import DeleteCommentModal from "./DeleteCommentModal"

function Layout() {
  const { user } = useContext(Authorization)
  const { params } = useContext(Router)
  const { posts } = useContext(Post)
  const [deletePost, setDeletePost] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [deleteComment, setDeleteComment] = useState(null)

  useEffect(
    _ => {
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

  if (currentItem === null) {
    return null
  }

  return (
    <div className="view-page">
      {deletePost && (
        <DeleteModal
          setDeletePost={setDeletePost}
          currentItem={currentItem}
          deletePost={deletePost}
        />
      )}
      {deleteComment && (
        <DeleteCommentModal
          setDeleteComment={setDeleteComment}
          currentItem={currentItem}
          deleteComment={deleteComment}
        />
      )}
      <SideNavUser />
      <div className="view-content">
        <ViewPostBody
          currentItem={currentItem}
          setDeletePost={setDeletePost}
          deletePost={deletePost}
          setDeleteComment={setDeleteComment}
          deleteComment={deleteComment}
        />
      </div>
      {/* <SideNavUser /> */}
    </div>
  )
}

export default Layout
