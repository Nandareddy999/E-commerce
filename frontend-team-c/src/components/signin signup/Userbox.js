// import "./App.css";
import React, { useState } from "react";
// import Accordion from "./component/Accordion";
import "./userbox.css"
import SignInForm from "./signIn";
import SignUpForm from "./Signup";


function Userbox() {

  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="sig">
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="headingtext1">Welcome Back!</h1>
              <p className="paratext">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="headingtext1">Hello, Friend!</h1>
              <p className="paratext">Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        </div>
      
    </div>
  );
}

export default Userbox;
