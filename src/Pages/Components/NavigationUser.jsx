import { useContext } from "react"
import { Logo } from "../../Icons/Icons"
import { Authorization } from "../../Contexts/Authorization"
import useLogin from "../../Hooks/useLogin"

function NavigationUser() {

    const {logout} = useLogin()

  return (
    <div className="navigation">
      <nav>
        <div className="left">
          <ul>
            <div className="search-icon"></div>
            <li className="double">Search</li>
            <li className="double">My feed</li>
          </ul>
        </div>
        <div className="center"><Logo /></div>
        <div className="right">
          <ul>
            <li><a href="#signup">Profile</a></li>

            <li onClick={logout}>
              Log out
            </li>
            <li>
            </li>
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
