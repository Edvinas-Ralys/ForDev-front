import React, { Profiler, useContext } from "react"
import { Profile } from "../../../Contexts/Profile"
import { Pen, TrashCan } from "../../../Icons/Icons"
import { Authorization } from "../../../Contexts/Authorization"

function PostTab({deletePost, setDeletePost}) {
  const { profile } = useContext(Profile)
  const {user} = useContext(Authorization)
  const viewPost = id =>{
    window.location.href = `#view/${id}`
  }
  return (
    <div className="post-tab">
      <div className="posts">
        {profile.userPosts.map((post, i) => (
          <div key={i}  className="post">
            <div className="info">


            <div onClick={_=>viewPost(post._id)} className="post-title">{post.title}</div>
            <div className="post-created">{post.createdAt.slice(0, 10)}</div>
            <div className="post-tags">
              {post.tags.map((tag, i) => (
                <div key={i} className="tag">
                  {tag}
                </div>
              ))}
            </div>
            </div>
            <div className="post-buttons">
            <div className="pen-wrapper icon">
                <Pen />
              </div>
              <div onClick={_=>setDeletePost({postId:post._id, userId: Number(user.id), postTitle:post.title})} className="trashcan-wrapper icon">
              <TrashCan />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostTab
