import { Logo } from "../../Icons/Icons"
import useLogin from "../../Hooks/useLogin"
import { useContext } from "react"
import { Authorization } from "../../Contexts/Authorization"

function NavigationUser({ offset, setComponentToScroll }) {
  const { logout } = useLogin()
  const { user } = useContext(Authorization)

  return (
    <div className={`navigation ${offset ? `scrolled` : ``}`}>
      <nav className={`${offset ? `scrolled` : ``}`}>
        <div onClick={_ => setComponentToScroll(`main`)} className="left">
          <Logo />
        </div>
        <div className="right">
          {user && (
            <div className="create-post">
              <a href="#create-post">Create a Post</a>
            </div>
          )}
          <div onClick={_ => setComponentToScroll(`explore`)}>Explore</div>
          <div>Search</div>
          <div>My feed</div>
          <div>
            <a href="#signup">Profile</a>
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

export default NavigationUser
