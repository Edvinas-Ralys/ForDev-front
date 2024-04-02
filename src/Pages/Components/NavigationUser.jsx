import { Logo } from "../../Icons/Icons"
import useLogin from "../../Hooks/useLogin"
import { useContext } from "react"
import { Authorization } from "../../Contexts/Authorization"

function NavigationUser() {
  const { logout } = useLogin()
  const { user } = useContext(Authorization)

  return (
    <div className="navigation">
      <nav>
        <div className="left">
          <Logo />
        </div>
        <div className="center"></div>
        <div className="right">
          <ul>
            {user && (
              <button className="create-post">
                <a href="#create-post">Create a Post</a>
              </button>
            )}
            <li>Explore</li>
            <li className="double">Search</li>
            <li className="double">My feed</li>
            <li>
              <a href="#signup">Profile</a>
            </li>

            <li onClick={logout}>Log out</li>
            <li></li>
            <label htmlFor="hamburger-menu" className="hamburger-menu">
              <input type="checkbox" name="" id="hamburger-menu" />
            </label>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavigationUser
