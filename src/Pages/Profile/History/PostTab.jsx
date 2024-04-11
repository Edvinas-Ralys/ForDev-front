import React, { useContext, useState } from "react"
import { Profile } from "../../../Contexts/Profile"
import { Post } from "../../../Contexts/Post"
import { Pen, TrashCan } from "../../../Icons/Icons"
import { Authorization } from "../../../Contexts/Authorization"
import { Router } from "../../../Contexts/Router"
import PostsPagination from "./PostsPagination"

function PostTab({ deletePost, setDeletePost }) {
  const { profile } = useContext(Profile)
  const { setEditPost } = useContext(Post)
  const { user } = useContext(Authorization)
  const { params } = useContext(Router)
  const [postPages, setPostPages] = useState({
    pagesFrom: 0,
    pagesTo: 3,
    currentPage: 1,
  })


  const nextPage = _ => {
    setPostPages(prev => ({
      ...prev,
      pagesFrom: prev.pagesTo,
      pagesTo: prev.pagesTo + 3,
      currentPage: prev.currentPage + 1,
    }))
  }
  const prePage = _ => {
    if (postPages.currentPage > 1 && postPages.pagesFrom !== 0) {
      setPostPages(prev => ({
        ...prev,
        pagesFrom: prev.pagesFrom - 3,
        pagesTo: prev.pagesTo - 3,
        currentPage: prev.currentPage - 1,
      }))
    }
  }

  const handleEditPost = currentPost =>{
    setEditPost(currentPost)
  }



  const viewPost = id => {
    window.location.href = `#view/${id}`
  }
  return (
    <div className="post-tab">
      <div className="posts">
        {profile.userPosts.map(
          (post, i) =>
            i >= postPages.pagesFrom &&
            i < postPages.pagesTo && (
              <div key={i} className="post">
                <div className="info">
                  <div onClick={_ => viewPost(post._id)} className="post-title">
                    {post.title}
                  </div>
                  <div className="post-created">{post.createdAt.slice(0, 10)}</div>
                  <div className="post-tags">
                    {post.tags.map((tag, i) => (
                      <div key={i} className="tag">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                {user ? (
                  user.id === params[0] ? (
                    <div className="post-buttons">
                      <div onClick={_=>handleEditPost(post)} className="pen-wrapper icon">
                        <Pen />
                      </div>
                      <div
                        onClick={_ =>
                          setDeletePost({
                            postId: post._id,
                            userId: Number(user.id),
                            postTitle: post.title,
                          })
                        }
                        className="trashcan-wrapper icon"
                      >
                        <TrashCan />
                      </div>
                    </div>
                  ) : (
                    ``
                  )
                ) : (
                  ``
                )}
              </div>
            )
        )}
      </div>
      {profile.userPosts.length > 3 && (
        <PostsPagination
          postPages={postPages}
          setPostPages={setPostPages}
          nextPage={nextPage}
          prePage={prePage}
        />
      )}
    </div>
  )
}

export default PostTab
