import { useContext, useEffect, useState } from "react"
import {
  handleInputValidation,
  original,
  handleEmailValidation,
  handleEmailValidationConfirm,
  validatePassword,
  validatedStyle,
  notValidatedStyle,
} from "../../Functions/signupFormValidation"
import { Messages } from "../../Contexts/Messages"

function Index() {
  const [firstName, setFistName] = useState({ value: ``, style: original, validated: false })
  const [lastName, setLastName] = useState({ value: ``, style: original, validated: false })
  const [email, setEmail] = useState({ value: ``, style: original, validated: false })
  const [confirmEmail, setConfirmEmail] = useState({ value: ``, style: original, validated: false })
  const { messages } = useContext(Messages)
  const [passwordValidated, setPasswordValidated] = useState(null)
  const [password, setPassword] = useState({
    value: ``,
    style: original,
    colorChange: false,
    validations: {
      charCount: false,
      uppercase: false,
      lowercase: false,
      number: false,
      symbol: false,
    },
  })

  const handleSignup = _ => {
    // setSignUpInfo({
    //   firstName: firstName.value,
    //   lastName: lastName.value,
    //   email: email.value,
    //   password: password.value,
    // })
  }


  useEffect(
    _ => {
      if (password.value === ``) {
        return
      }
      if (Object.values(password.validations).every(validation => validation === true)) {
        setPasswordValidated(true)
      } else {
        setPasswordValidated(false)
      }
    },
    [password]
  )

  return (
    <div className="sign-up-page">
      <div className="logo">
        <a href="#home">LOGO</a>
      </div>
      <div className="right-content">
        <div className="right-top">
          Already have an account?{" "}
          <span>
            <a href="#login">Login</a>
          </span>
        </div>
        <div className="signup-form">
          <div className="form-title">Your account details</div>
          <div className="form">
            <div className="form-element">
              <div className="floating-label-group">
                <label className="floating-label">Username</label>
                <input
                  type="text"
                  value={firstName.value}
                  onChange={e => handleInputValidation(e, setFistName)}
                  style={firstName.style}
                />
              </div>
            </div>
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
                <label className="floating-label">Confirm Email</label>
                <input
                  type="email"
                  value={confirmEmail.value}
                  onChange={e => handleEmailValidationConfirm(e, email.value, setConfirmEmail)}
                  style={confirmEmail.style}
                />
              </div>
            </div>
            <div className="form-element">
              <div className="floating-label-group">
                <label className="floating-label">Password</label>
                <input
                  type="password"
                  value={password.value}
                  onChange={e => validatePassword(e, setPassword, password)}
                  style={
                    passwordValidated === null
                      ? original
                      : passwordValidated
                      ? validatedStyle
                      : notValidatedStyle
                  }
                />
              </div>
            </div>
            <div className="form-element password-req">
              <div className="pass-req-title">Your password must have:</div>
              <ul>
                <li className={`${password.validations.charCount ? `validated` : `not-validated`}`}>
                  At least 12 characters{" "}
                </li>
                <li className={`${password.validations.uppercase ? `validated` : `not-validated`}`}>
                  1 uppercaser letter
                </li>
                <li className={`${password.validations.lowercase ? `validated` : `not-validated`}`}>
                  1 lowercase letter
                </li>
                <li className={`${password.validations.number ? `validated` : `not-validated`}`}>
                  1 number
                </li>
                <li className={`${password.validations.symbol ? `validated` : `not-validated`}`}>
                  1 symbol
                </li>
              </ul>
            </div>
            <div className="sign-up-confirm">
              <div className="finepprint">
                By clicking the Sign Up button below, you agree to <span>Terms of Service</span> and
                acknowledge the <span>Privacy Notice</span>.
              </div>
              <button onClick={handleSignup} className="dark">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
