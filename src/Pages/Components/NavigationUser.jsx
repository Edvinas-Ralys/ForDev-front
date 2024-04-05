import { Chevron, Logo, ProfileIcon } from "../../Icons/Icons"
import useLogin from "../../Hooks/useLogin"
import { useContext } from "react"
import { Authorization } from "../../Contexts/Authorization"
import NavigationDropdown from "./NavigationDropdown"

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
          <div onClick={_ => setComponentToScroll(`explore`)}>Explore</div>
          <div>Search</div>
          <div className="dropdown nav-profile-card">
            <ProfileIcon />
            {user.username}
            <Chevron />
            <NavigationDropdown />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationUser
