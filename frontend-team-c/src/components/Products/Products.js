import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import "../HomePage/Homepage.css";
import RandomBackgroundColor from "../HomePage/RandomBackgroundColor";

function Products() {
  const [mobiles, setMobiles] = useState([]);
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    async function fetchLaptops() {
      try {
        const response = await fetch(
          "https://teamcapi.onrender.com/products/category/laptops"
        );
        const { products } = await response.json();
        if (Array.isArray(products)) {
          const laptopsData = products.slice(0, 4).map((product) => ({
            id: product._id,
            name: product.name,
            src: product.images[0],
            alt: product.title,
            text: product.productDesc,
            subText: `Price: $${product.price}`,
          }));
          setLaptops(laptopsData);
        } else {
          console.error("Laptops data is not an array:", products);
        }
      } catch (error) {
        console.error("Error fetching laptops data:", error);
      }
    }

    async function fetchMobiles() {
      try {
        const response = await fetch(
          "https://teamcapi.onrender.com/products/category/smartphones"
        );
        const { products } = await response.json();
        if (Array.isArray(products)) {
          const mobilesData = products.slice(0, 4).map((product) => ({
            id: product._id,
            name: product.name,
            src: product.images[0],
            alt: product.title,
            text: product.productDesc,
            subText: `Price: $${product.price}`,
          }));
          setMobiles(mobilesData);
        } else {
          console.error("Mobiles data is not an array:", products);
        }
      } catch (error) {
        console.error("Error fetching mobiles data:", error);
      }
    }

    fetchLaptops();
    fetchMobiles();
  }, []);

  function truncateText(text, maxLength) {
    if (!text) {
      return "";
    }
    const words = text.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return text;
  }

  return (
    <div>
      <div>
        <h1 className=" categorytitle ">Laptops</h1>
      </div>
      <div className="text-center">
        <div className="row">
          {laptops.map((item) => (
            <RandomBackgroundColor key={item.id} className="cardhome">
              {console.log(item)}
              <Link to={`/products/${item.id}`}>
                <div>
                  <div className="image-css">
                    <img src={item.src} alt={item.alt} className="img-fluid" />
                  </div>
                  <p className="ptext">{item.name}</p>
                  <p className="ptext">{truncateText(item.text, 4)}</p>
                  <p className="ptext">{item.subText}</p>
                </div>
              </Link>
            </RandomBackgroundColor>
          ))}
        </div>
      </div>
      <div>
        <div className=" categorytitle ">
          <h1 className=" categorytitle ">Mobiles</h1>
        </div>
        <div className="text-center">
        <div className="row">
          {mobiles.map((item) => (
            <RandomBackgroundColor key={item.id} className="cardhome">
              <Link to={`/products/${item.id}`}>
                <div className="">
                  <div className="image-css">
                    <img src={item.src} alt={item.alt} className="img-fluid" />
                  </div>
                  <p className="ptext">{item.name}</p>
                  <p className="ptext">{truncateText(item.text, 4)}</p>
                  <p className="ptext">{item.subText}</p>
                </div>
              </Link>
            </RandomBackgroundColor>
          ))}
        </div></div>
      </div>
    </div>
  );
}

export default Products;
