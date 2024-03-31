import React from "react"

function Index() {
  return (
    <div className="login-page">
      <div className="login-content">
        <div className="top">Log In</div>
        <div className="login-form">
          {/* <div className="form-title">Your account details</div> */}
          <div className="form">
            <div className="form-element">
              <div className="floating-label-group">
                <label className="floating-label">Email</label>
                <input type="email" />
              </div>
            </div>
            <div className="form-element"></div>
            <div className="form-element">
              <div className="floating-label-group">
                <label className="floating-label">Password</label>
                <input type="password" />
              </div>
            </div>
            <div className="login-confirm">
              <button className="dark">Sign In</button>
            </div>
          </div>
        </div>
        <div className="fineprint">
          <div className="sign-up">
            Dont have an account? <span><a href="#signup">Sign up!</a></span>
          </div>
          <div className="home">
            <a href="#home">Home</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
