import React, { useContext, useEffect, useState } from "react"
import PostTab from './History/PostTab'
import CommentTab from "./History/CommentTab"

function History() {
  const [activeTab, setActiveTab] = useState(`posts`)


  return (
    <div className='history'>
      <div className="tabs">
        <div onClick={_=>setActiveTab(`posts`)} className={`tab ${activeTab !== `posts` ? `inactive` : ``}`}>Posts</div>
        <div onClick={_=>setActiveTab(`comments`)} className={`tab ${activeTab !== `comments` ? `inactive` : ``}`}>Comments</div>
      </div>
      {activeTab === `posts` ? <PostTab /> : <CommentTab />}

    </div>
  )
}

export default History
