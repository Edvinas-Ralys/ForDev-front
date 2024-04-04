import { Chevron, Logo } from "../../Icons/Icons"
import useLogin from "../../Hooks/useLogin"
import { useContext, useState } from "react"
import { Authorization } from "../../Contexts/Authorization"
import { Router } from "../../Contexts/Router"
import Preview from "../CreatePost/Preview"
import { Post } from "../../Contexts/Post"

function SideNavUser({ setPreview, preview }) {
  const { logout } = useLogin()
  const { user } = useContext(Authorization)
  const { params, setParams, route } = useContext(Router)
  const [displayDropdown, setDisplayDropdown] = useState(_ => {
    if (params[0] === `preview`) {
      return `create`
    }
  })
  const {title, content, categories, image} = useContext(Post)

  const backToEdit = _ => {
    setParams([])
    window.location.href = `#create-post`
  }
  const toPreview = _ =>{
    setParams([`preview`])
    setPreview({title: title, text: content, tags: categories, image: image })
  }

  const toggleDropdown = dropdown => {
    if (displayDropdown === dropdown) {
      setDisplayDropdown(null)
    } else {
      setDisplayDropdown(dropdown)
    }
  }

//   if (preview === null) {
//     return (window.location.href = `#create-post`)
//   }

  return (
    <div className="side-navigation">
      <nav>
        <div className="left">
          <a href="#home"><Logo /></a>
        </div>
        <div className="right">
          {user && (
            <div className="create-post">
              <div
                onClick={_ => toggleDropdown(`create`)}
                className={`drop-trigger ${displayDropdown === `create` ? `selected-trigger` : ``}`}
              >
                Create a Post
                <div
                  className={`chevron-wrapper ${
                    displayDropdown === `create` ? `selected-chevron` : ``
                  }`}
                >
                  <Chevron />
                </div>
              </div>

              {/* <a href="#create-post">Create a Post</a> */}
              <div
                className={`create-post-dropdown ${
                  displayDropdown === `create` ? `selected-dropdown` : ``
                }`}
              >
                <div
                  onClick={backToEdit}
                  className={`edit ${!params[0] && route === `#create-post` ? `selected-tab` : ``}`}
                >
                  Edit{" "}
                </div>
                {preview !== null && (
                  <div
                  onClick={toPreview}
                    className={`preview ${
                      params[0] === `preview` && route === `#create-post` ? `selected-tab` : ``
                    }`}
                  >
                    Preview
                    {/* <a href="#create/preview">Preview</a> */}
                  </div>
                )}
              </div>
            </div>
          )}
          <div>Explore</div>
          <div>Search</div>
          <div>My feed</div>
          <div onClick={_ => setDisplayDropdown(`profile`)}>
            Profile
            {/* <a href="#signup">Profile</a> */}
          </div>

          <div onClick={logout}>Log out</div>
          <label htmlFor="hamburger-menu" className="hamburger-menu">
            <input type="checkbox" name="" id="hamburger-menu" />
          </label>
        </div>
      </nav>
    </div>
  )
}

export default SideNavUser
