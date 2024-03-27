import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchTotalPrice(userId) {
      try {
        const response = await fetch(
          `https://teamcapi.onrender.com/cart/total/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTotalPrice(data.totalPrice);
      } catch (error) {
        console.error("Error fetching total price:", error);
        // You can handle error messages or fallback values here
      }
    }

    fetchTotalPrice(userId);
  }, []);

  useEffect(() => {
    // Retrieve user ID from local storage
    const userId = localStorage.getItem("userId");

    // Make request to first API endpoint to get cart details
    fetch(`https://teamcapi.onrender.com/cart/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract product IDs from cart items
        const productIds = data.cart.map((item) => item.product);
        // Make requests to second API endpoint for each product ID
        Promise.all(
          productIds.map((productId) =>
            fetch(`https://teamcapi.onrender.com/products/${productId}`)
              .then((response) => response.json())
              .then((productData) => ({
                id: productData.product._id,
                name: productData.product.name,
                price: productData.product.price,
                quantity: data.cart.find((item) => item.product === productId)
                  .quantity,
                image: productData.product.imageSrc,
                description: productData.product.productDesc,
              }))
          )
        )
          .then((products) => {
            // Set cart items with additional product details
            setCartItems(products);
          })
          .catch((error) =>
            console.error("Error fetching product details:", error)
          );
      })
      .catch((error) => console.error("Error fetching cart details:", error));
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `https://teamcapi.onrender.com/remove-from-cart/${userId}/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Remove the item from cartItems
      setCartItems(cartItems.filter((item) => item.id !== itemId));
      //refresh
      window.location.reload();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve user ID from local storage
      const userId = localStorage.getItem("userId");
  
      // Send DELETE request to clear cart for the user
      const response = await fetch(
        `https://teamcapi.onrender.com/cart/clear/${userId}`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      // Clear cartItems
      setCartItems([]);
  
      // Navigate to thank you page
      navigate("/thanku");
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };
  

  // Render UI with cart items

  return (
    <div className="pt-5">
    <section className="cart " style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-lg-7">
                    <h5 className="mb-3">
                      <a
                        href="#!"
                        className="text-body"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        <i className="fas fa-long-arrow-alt-left me-2"></i>
                        Continue shopping
                      </a>
                    </h5>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">
                          You have {cartItems.length} items in your cart
                        </p>
                      </div>
                      <div>
                        <p className="mb-0">
                          <span className="text-muted">Sort by:</span>{" "}
                          <a href="#!" className="text-body">
                            price <i className="fas fa-angle-down mt-1"></i>
                          </a>
                        </p>
                      </div>
                    </div>
                    {/* Render cart items dynamically */}
                    {cartItems.map((item) => (
                      <div className="card mb-3" key={item.id}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src={item.image}
                                  className="img-fluid rounded-3"
                                  alt="Shopping item"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div className="ms-3">
                                <h5>{item.name}</h5>
                                <p className="small mb-0">{item.description}</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "50px" }}>
                                <h5 className="fw-normal mb-0">
                                  {item.quantity}
                                </h5>
                              </div>
                              <div style={{ width: "80px" }}>
                                <h5 className="mb-0">${item.price}</h5>
                              </div>
                              <a
                                href="#!"
                                style={{ color: "#cecece" }}
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Show more/less button */}
                    {cartItems.length > 4 && (
                      <button
                        className="btn btn-primary"
                        // onClick={() => setShowAllItems(!showAllItems)}
                      >
                        {/* {showAllItems ? "Show less" : "Show more"} */}
                      </button>
                    )}
                  </div>
                  <div className="col-lg-5">
                    <div className="card bg-primary text-white rounded-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">Card details</h5>
                          {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" className="img-fluid rounded-3" style={{ width: '45px' }} alt="Avatar" /> */}
                        </div>
                        <p className="small mb-2">Card type</p>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-visa fa-2x me-2"></i>
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-amex fa-2x me-2"></i>
                        </a>
                        <a href="#!" type="submit" className="text-white">
                          <i className="fab fa-cc-paypal fa-2x"></i>
                        </a>
                        <form
                          className="mt-4 pr-0 pl-0"
                          id="formbox"
                          onSubmit={handleSubmit}
                        >
                          <div className="form-outline form-white mb-4">
                            <input
                              type="text"
                              id="typeName"
                              className="form-control form-control-lg"
                              size="17"
                              placeholder="Cardholder's Name"
                              required
                              value={cardholderName}
                              onChange={(e) =>
                                setCardholderName(e.target.value)
                              }
                            />
                            <label className="form-label" htmlFor="typeName">
                              Cardholder's Name
                            </label>
                          </div>
                          <div className="form-outline form-white mb-4">
                            <input
                              type="text"
                              id="typeText"
                              className="form-control form-control-lg"
                              size="17"
                              placeholder="1234 5678 9012 3457"
                              minLength="16"
                              maxLength="16"
                              required
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                            <label className="form-label" htmlFor="typeText">
                              Card Number
                            </label>
                          </div>
                          <div className="row mb-4">
                            <div className="col-md-6">
                              <div className="form-outline form-white">
                                <input
                                  type="text"
                                  id="typeExp"
                                  className="form-control form-control-lg"
                                  placeholder="MM/YYYY"
                                  size="7"
                                  minLength="7"
                                  maxLength="7"
                                  required
                                  value={expiration}
                                  onChange={(e) =>
                                    setExpiration(e.target.value)
                                  }
                                />
                                <label className="form-label" htmlFor="typeExp">
                                  Expiration
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-outline form-white">
                                <input
                                  type="password"
                                  id="typeText"
                                  className="form-control form-control-lg"
                                  placeholder="&#9679;&#9679;&#9679;"
                                  size="1"
                                  minLength="3"
                                  maxLength="3"
                                  value={cvv}
                                  onChange={(e) => setCvv(e.target.value)}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="typeText"
                                >
                                  CVV
                                </label>
                              </div>
                            </div>
                          </div>

                          <hr className="my-4" />
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">${totalPrice}</p>
                          </div>
                          

                          {/* Checkout button */}
                          <button
                            type="submit"
                            className="btn btn-info btn-block btn-lg"

                          
                          >
                            <div className="d-flex justify-content-between">
                              <span>
                                ${totalPrice }
                              </span>
                              <span   onClick={
                              handleSubmit
                              
                            }>
                                Checkout
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default Cart;
