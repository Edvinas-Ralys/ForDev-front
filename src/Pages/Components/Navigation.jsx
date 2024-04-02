import { Logo } from "../../Icons/Icons"

function Navigation({offset}) {
  return (
    <div className={`navigation ${offset ? `scrolled` : ``}`}>
      <nav className={`${offset ? `scrolled` : ``}`}>
        <div className="left">
          <Logo />
        </div>

        <div className="right">

          <ul>
          <li className="double">How it works</li>
            <li>
              <a href="#signup">Sign up</a>
            </li>
            <li>
              <a href="#login">Log in</a>
            </li>
            {/* <label htmlFor="hamburger-menu" className="hamburger-menu">
              <input type="checkbox" name="" id="hamburger-menu" />
            </label> */}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
