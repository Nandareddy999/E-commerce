import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Navbartemp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if username exists in local storage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear username and user ID from local storage
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    // Clear username state
    setUsername("");
  };

  const fetchSuggestions = async (term) => {
    try {
      const response = await fetch(
        `https://teamcapi.onrender.com/search/suggestions?term=${term}`
      );
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions);
      } else {
        console.error("Error fetching suggestions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchSuggestions(term);
  };

  return (
    <div id="top">
      <Navbar expand="lg" id="nav">
        <Navbar.Brand className="logo">
          <b onClick={() => navigate("/home")}>Team C</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate("/proapi")}>
                All Products
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/laptopdata")}>
                Laptops
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate("/smartphoneData")}>
                Smartphones
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline className="search-holder">
            <div className="row">
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input rounded-5 pl-3 shadow-none"
                  style={{ outline: "none" }}
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                {suggestions.length > 0 && (
                  <ul className="suggestionbar rounded-2">
                    {suggestions.map((suggestion) => (
                      <li key={suggestion._id} className="suggestionli">
                        <Link to={`/products/${suggestion._id}`}>
                          {suggestion.name} {suggestion.category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Form>
          <div className="ml-auto d-flex align-items-center">
            <Button
              variant="outline-light"
              onClick={() => {
                if (!username) {
                  navigate("/signin");
                }
              }}
              className="login-btn mx-3 rounded-5"
            >
              Hello, {username ? username : "Sign In"}
            </Button>
            {username && (
              <Button
                variant="outline-light"
                onClick={handleLogout}
                className="login-btn  rounded-5"
              >
                Logout
              </Button>
            )}
            <Button
              className="icon-button rounded-5"
              onClick={() => navigate("/cart")}
            >
              <i className="fas fa-shopping-cart"></i>
              View Cart
            </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navbartemp;
