import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SignUpForm() {
  const [state, setState] = React.useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await fetch("https://teamcapi.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const data = await response.json();

      if (response.ok) {
        // User registered successfully
        alert(data.message);
        // Clear form fields
        setState({
          fname: "",
          lname: "",
          username: "",
          email: "",
          phone: "",
          password: "",
        });
      } else {
        // Display error message
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      // Display error message
      alert("An error occurred, please try again later.");
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form className="formdata" onSubmit={handleOnSubmit}>
        <h2 className="headingtext2">
          <strong>Create Account</strong>
        </h2>

        <Row>
          <Col className="col-6">
            <input
              className="inputdata"
              type="text"
              name="fname"
              value={state.fname}
              onChange={handleChange}
              placeholder="First Name"
            />
          </Col>
          <Col className="col-6">
            <input
              className="inputdata"
              type="text"
              name="lname"
              value={state.lname}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </Col>
        </Row>

        <input
          className="inputdata"
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
        />

        <input
          className="inputdata"
          type="number"
          name="phone"
          value={state.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          className="inputdata"
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="inputdata"
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="ghost">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
