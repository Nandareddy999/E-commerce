import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RandomBackgroundColor from './RandomBackgroundColor'; 
import './Homepage.css';
import Navbartemp from '../Navbar/Navbartemp';
import Footer from '../Footer/Footer';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://teamcapi.onrender.com/products');
        console.log('Response data:', response.data);
        setProducts(response.data.products); // Update to setProducts(response.data.products)
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbartemp/>
      <br></br>
          <br></br>
        
      <br></br><h1 className='categorytitle'>All products</h1>
      <div className="text-center">
        
        {products.map((product) => ( // Iterate over products array
        
        <RandomBackgroundColor  key={product._id}>
          
            <h3 className='product_title'>{product.title}</h3>
            <img src={product.imageSrc} alt={product.title} />
            <h3>${product.price}</h3>
            <p><strong>{product.name}</strong> </p>
            <p>Category: {product.categoryId}</p>
            {/* Add Link to product details page */}
            <Link className="detail button-86" to={`/products/${product._id}`}>
              View Details
            </Link>
          
          </RandomBackgroundColor>
        ))}
    </div>
    <Footer/>
    </div>
  );
};

export default HomePage;
