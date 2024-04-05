import { useContext } from "react"
import { Authorization } from "../../Contexts/Authorization"
import useLogin from "../../Hooks/useLogin"

function NavigationDropdown() {
  const { user } = useContext(Authorization)
  const { logout } = useLogin()
  return (
    <div className="profile-dropdown">
      <div className="dropdown-container">
        <div className="dropdown-element">
          <div className="dropdown-selection">
            <a href="#profile">Profile</a>
          </div>
          {user && (
            <div className="dropdown-selection">
              <a href="#create-post">Create a Post</a>
            </div>
          )}
          <div className="dropdown-selection">My feed</div>
          <div onClick={logout} className="dropdown-selection">
            Logout
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationDropdown
