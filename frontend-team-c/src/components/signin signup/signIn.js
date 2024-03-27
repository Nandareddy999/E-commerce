import React from "react";

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();

    const { email, password } = state;
    try {
      const response = await fetch("https://teamcapi.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("userId", data.user.id);
        window.location.href = "/home"; // Manually redirect to /home
      } else if (response.status === 401) {
        // Invalid password
        alert("Invalid password");
      } else if (response.status === 404) {
        // User not found
        alert("User not found");
      } else {
        // Handle other errors
        alert("Internal Server Error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form className="formdata" onSubmit={handleOnSubmit}>
        <h1 className="headingtext1">Sign in</h1>
        <input
          className="inputdata"
          type="email"
          placeholder="Enter Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          className="inputdata"
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a className="atag" href="#">
          Forgot your password?
        </a>
        <button className="ghost">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
