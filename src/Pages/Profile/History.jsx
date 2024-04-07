import React, { useContext, useEffect, useState } from "react"
import PostTab from './History/PostTab'
import CommentTab from "./History/CommentTab"
import DeleteModal from "./History/DeleteModal"

function History() {
  const [activeTab, setActiveTab] = useState(`posts`)
  const [deletePost, setDeletePost] = useState(null)

  useEffect(_=>{
    console.log(deletePost)
  }, [deletePost])

  return (
    <div className='history'>
      <div className="tabs">
        <div onClick={_=>setActiveTab(`posts`)} className={`tab ${activeTab !== `posts` ? `inactive` : ``}`}>Posts</div>
        <div onClick={_=>setActiveTab(`comments`)} className={`tab ${activeTab !== `comments` ? `inactive` : ``}`}>Comments</div>
      </div>
      {activeTab === `posts` ? <PostTab deletePost={deletePost} setDeletePost={setDeletePost}/> : <CommentTab />}
      {deletePost && <DeleteModal setDeletePost={setDeletePost} deletePost={deletePost}/>}
    </div>
  )
}

export default History
