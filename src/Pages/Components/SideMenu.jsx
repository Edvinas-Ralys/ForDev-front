import React, { useContext } from "react"
import { Chevron, Close } from "../../Icons/Icons"
import useLogin from "../../Hooks/useLogin"
import { Authorization } from "../../Contexts/Authorization"

function SideMenu() {
  const { logout } = useLogin()
  const { user } = useContext(Authorization)
  return (
    <div className="side-menu">
      <nav className="side-menu-container">
        <div className="side-menu-exit">
          <label htmlFor="hamburger-menu">
            <Close />
          </label>
        </div>
        <div className="side-menu-nav">
          <div className="nav-element">
            <a href={`#home`}>
              <div className="left">
                <div className="title">Home</div>
              </div>
              <div className="right">
                <Chevron />
              </div>
            </a>
          </div>
          <div className="nav-element">
            <a href={`#profile/${user.id}`}>
              <div className="left">
                <div className="title">Profile</div>
                <div className="sub-text">Edit your profile, view post and comment history</div>
              </div>
              <div className="right">
                <Chevron />
              </div>
            </a>
          </div>
          <div className="nav-element">
            <a href="#create-post">
              <div className="left">
                <div className="title">Create a Post</div>
                <div className="sub-text">Share your ideas with the World!</div>
              </div>
              <div className="right">
                <Chevron />
              </div>
            </a>
          </div>
          <div className="nav-element">
            <div className="left">
              <div className="title">My Feed</div>
              <div className="sub-text">Check out whats new from your favorite creators</div>
            </div>
            <div className="right">
              <Chevron />
            </div>
          </div>
          <div className="nav-element">
            <div className="left">
              <a href="#search">
                <div className="title">Search</div>
              </a>
            </div>
            <div className="right">
              <Chevron />
            </div>
          </div>
          {/* <div className="nav-element">
            <div className="left">
              <div className="title">Log Out</div>
              <div className="sub-text">Technical support and help</div>
            </div>
            <div className="right">
              <Chevron />
            </div>
          </div> */}
        </div>
        <div className="side-menu-buttons">
          <button onClick={logout} className="button-solid-clr">
            Log Out
          </button>
        </div>
      </nav>
    </div>
  )
}

export default SideMenu
