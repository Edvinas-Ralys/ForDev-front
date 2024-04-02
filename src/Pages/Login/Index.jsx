import { useContext, useEffect, useState } from "react"
import {
  original,
  handleEmailValidation,
  notValidatedStyle,
} from "../../Functions/signupFormValidation"
import useLogin from "../../Hooks/useLogin"
import Loading from "../Components/Loading"
import { Router } from "../../Contexts/Router"
import { Messages } from "../../Contexts/Messages"
import { Authorization } from "../../Contexts/Authorization"

function Index() {
  const { setloginInfo } = useLogin()
  const { loading } = useContext(Router)
  const [email, setEmail] = useState({ value: ``, style: original, validated: false })
  const [password, setPassword] = useState({ value: ``, style: original, validated: false })
  const { messages } = useContext(Messages)
  const {user} = useContext(Authorization)

  useEffect(
    _ => {
      if (messages.length === 0 || messages[0].location !== `login`) {
        return
      } else if (messages[0].cause === `fields`) {
        email.value === `` &&
          setEmail(prev => ({ ...prev, style: notValidatedStyle, validated: false }))
        password.value === `` &&
          setPassword(prev => ({ ...prev, style: notValidatedStyle, validated: false }))
      } else if (messages[0].cause === `user`) {
        setEmail(prev => ({ ...prev, value: ``, style: original, validated: false }))
        setPassword(prev => ({ ...prev, value: ``, style: original, validated: false }))
      } else if (messages[0].cause === `invalid-input`) {
        setPassword(prev => ({ ...prev, value: ``, style: original, validated: false }))
      } else if (messages[0].cause === `unauthorized` || messages[0].cause === `forbidden`) {
        setEmail(prev => ({ ...prev, style: notValidatedStyle }))
        setPassword(prev => ({ ...prev, style: notValidatedStyle }))
      }
    },
    [messages]
  )

  const handleLogin = _ => {
    setloginInfo({ email: email.value, password: password.value })
  }

  if(user){
    return window.location.href = `#home`
  }

  return (
    <>
  {loading && <Loading />}
    <div className="login-page">
      <div className="login-content">
        <div className="top">Log In</div>
        <div className="login-form">
          <div className="form">
            <div className="form-element">
              <div className="floating-label-group">
                <label className="floating-label">Email</label>
                <input
                  type="email"
                  value={email.value}
                  onChange={e => handleEmailValidation(e, setEmail)}
                  style={email.style}
                />
              </div>
            </div>

            <div className="form-element">
              <div className="floating-label-group">
                <label className="floating-label">Password</label>
                <input
                  type="password"
                  value={password.value}
                  onChange={e =>
                    setPassword(prev => ({ ...prev, value: e.target.value, style: original }))
                  }
                  style={password.style}
                />
              </div>
            </div>
            <div className="login-confirm">
              <button onClick={handleLogin} className="dark">Log In</button>
            </div>
          </div>
        </div>
        <div className="fineprint">
          <div className="sign-up">
            Dont have an account?{" "}
            <span>
              <a href="#signup">Sign up!</a>
            </span>
          </div>
          <div className="home">
            <a href="#home">Home</a>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Index
