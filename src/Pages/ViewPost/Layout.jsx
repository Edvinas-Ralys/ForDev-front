import React, { useContext, useState, useEffect } from "react"
import { Authorization } from "../../Contexts/Authorization"
import { Post } from "../../Contexts/Post"
import ViewPostBody from "./ViewPostBody"
import { Router } from "../../Contexts/Router"
import DeleteModal from "./DeleteModal"
import DeleteCommentModal from "./DeleteCommentModal"
import { Comment } from "../../Contexts/Comment"
import EditCommentModal from "./EditCommentModal"
import NavigationUser from "../Components/NavigationUser"
import Navigation from "../Components/Navigation"

function Layout() {
  const { user } = useContext(Authorization)
  const { params } = useContext(Router)
  const { posts } = useContext(Post)
  const [deletePost, setDeletePost] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [deleteComment, setDeleteComment] = useState(null)
  const [editComment, setEditComment] = useState(null)
  const {setGetComments} = useContext(Comment)
  const [offset, setOffset] = useState(false)

  useEffect(
    _ => {
      if (posts.length !== 0) {
        const currPost = posts.find(f => f._id === params[0])
        if (!currPost) {
          setCurrentItem(null)
        } else {
          setCurrentItem(currPost)
          setGetComments({postId:currPost._id})
        }
      }
    },
    [posts, params, setGetComments]
  )
  useEffect(_ => {
    window.onscroll = _ => {
      if (window.scrollY > 0) {
        setOffset(true)
      } else {
        setOffset(false)
      }
    }
  }, [])

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
      {editComment && (
        <EditCommentModal
          setEditComment={setEditComment}
          editComment={editComment}
          currentItem={currentItem}
        />
      )}
      {/* <SideNavUser /> */}
      {user ? <NavigationUser offset={offset}/> : <Navigation offset={offset}/>}
      <div className="view-content">
        <ViewPostBody
          currentItem={currentItem}
          setDeletePost={setDeletePost}
          deletePost={deletePost}
          setDeleteComment={setDeleteComment}
          deleteComment={deleteComment}
          setEditComment={setEditComment}
          editComment={editComment}
        />
      </div>
      {/* <SideNavUser /> */}
    </div>
  )
}

export default Layout
