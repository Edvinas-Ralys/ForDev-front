import { Logo } from "../../Icons/Icons"

function Navigation() {
  return (
    <div className="navigation">
      <nav>
        <div className="left">
          <ul>
            <div className="search-icon"></div>
            <li className="double">How it works</li>
            {/* <NavigationDropdown /> */}
          </ul>
        </div>
        <div className="center"><Logo /></div>
        <div className="right">
          <ul>
            <li>Sign up</li>
            <li>
              <a href="#login">Log in</a>
            </li>
            <li>
              {/* <a href="#sign-up">
                <button>Start a GoFundMe</button>
              </a> */}
            </li>
            <label htmlFor="hamburger-menu" className="hamburger-menu">
              <input type="checkbox" name="" id="hamburger-menu" />
            </label>
            {/* <SideMenu /> */}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
