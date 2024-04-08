import { Chevron, Logo, ProfileIcon } from "../../Icons/Icons"
import useLogin from "../../Hooks/useLogin"
import { useContext } from "react"
import { Authorization } from "../../Contexts/Authorization"
import NavigationDropdown from "./NavigationDropdown"
import { Router } from "../../Contexts/Router"

function NavigationUser({ offset, setComponentToScroll }) {
  const { logout } = useLogin()
  const { user } = useContext(Authorization)
  const {route} = useContext(Router)
  const handleScrollLogo = _ =>{
    if(route !== `#home`){
      window.location.href = `#home`
    } else {
      setComponentToScroll(`main`)
    }
  }
  const handelScrollExplore = _ =>{
    if(route !== `#home`){
      window.location.href = `#home`
    } else {
      setComponentToScroll(`explore`)
    }
  }

  return (
    <div className={`navigation ${offset ? `scrolled` : ``}`}>
      <nav className={`${offset ? `scrolled` : ``}`}>
        <div onClick={handleScrollLogo} className="left">
          <Logo />
        </div>
        <div className="right">
          <div onClick={handelScrollExplore}>Explore</div>
          <div><a href="#search">Search</a></div>
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
