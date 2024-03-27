import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RandomBackgroundColor from '../HomePage/RandomBackgroundColor'; 
import '../HomePage/Homepage.css';
import Navbartemp from '../Navbar/Navbartemp';
import Footer from '../Footer/Footer';

function SmartPhones() {
    const [mobiles, setMobiles] = useState([]);

    useEffect(() => {
        async function fetchMobiles() {
            try {
                const response = await fetch("https://teamcapi.onrender.com/products/category/smartphones");
                const { products } = await response.json();

                if (Array.isArray(products)) {
                    const mobilesData = products.slice(0, 4).map((product) => ({
                        id: product._id, // Assuming "_id" is the unique identifier
                        name: product.name,
                        src: product.images[0],
                        alt: product.title,
                        text: product.productDesc,
                        subText: `Price: $${product.price}`,
                    }));

                    setMobiles(mobilesData);
                } else {
                    console.error("Products data is not an array:", products);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchMobiles();
    }, []);

    return (
        <div>
          <Navbartemp/>
          <br></br>
          <br></br>
          <br></br>
         
            <h1 className='categorytitle'>Mobiles</h1>
            <div className='text-center'>
                {mobiles.map((item) => (
                    <RandomBackgroundColor key={item.id} className="col-md-3">
                        <Link to={`/products/${item.id}`}>
                            <div className="">
                                <div className="image-css">
                                    <img src={item.src} alt={item.alt} className="img-fluid" />
                                </div>
                                <p className="ptext">{item.name}</p>
                                <p className="ptext">{item.text}</p>
                                <p className="ptext">{item.subText}</p>
                            </div>
                        </Link>
                    </RandomBackgroundColor>
                ))}
            </div>
            <Footer/>
            
        </div>
    );
}

export default SmartPhones;
