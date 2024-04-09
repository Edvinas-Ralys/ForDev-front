import { Logo } from "../../Icons/Icons"
import { Router } from "../../Contexts/Router"
import { useContext } from "react"

function Navigation({offset, setComponentToScroll}) {
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

  const {route} = useContext(Router)
  return (
    <div className={`navigation ${offset ? `scrolled` : ``}`}>
      <nav className={`${offset ? `scrolled` : ``}`}>
      <div onClick={handleScrollLogo} className="left">
          <Logo />
        </div>
        <div className="right">
          <div onClick={handelScrollExplore}>Explore</div>
          <div><a href="#login">Login</a></div>
          <div><a href="#signup">Sign up</a></div>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
