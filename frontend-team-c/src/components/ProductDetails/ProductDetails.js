import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Navbartemp from '../Navbar/Navbartemp';
import Footer from '../Footer/Footer';

const ProductDetails = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://teamcapi.onrender.com/products/${_id}`);
        console.log('Product details:', response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [_id]);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post(`https://teamcapi.onrender.com/add-to-cart/${userId}`, {
        productId: _id,
        quantity: quantity
      });
      console.log(response.data.message); // Product added to cart successfully
      setAddedToCart(true);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center" >
      <Navbartemp/>
      <br></br>
      <br></br>
      <h3 className="categorytitle text-4xl font-bold my-2 text-center">Product Detail Page</h3>
      <br></br>
      <br></br>

      {product && (
        <div >
          <h4>Title: {product.product.name}</h4>
          <p>Description: {product.product.productDesc}</p>
          <p>Price: ${product.product.price}</p>
          <p>Stock: {product.product.stock}</p>
          <p>Category: {product.product.categoryId}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {product.product.images.map((image, index) => (
              <Card key={index} style={{ width: '18rem', margin: '0.5rem' }}>
                <Card.Img variant="top" src={image} alt={`Image ${index + 1}`} />
              </Card>
            ))}
          </div>
      <br></br>
      
      {!addedToCart && (
            <div>
              <label className='mr-2'>Quantity:</label>
              <input className='p-1 mr-2' type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" />
              <button className='btn-primary p-1' onClick={handleAddToCart} disabled={loading}>
                {loading ? 'Adding to Cart...' : 'Add to Cart'}
              </button>
            </div>
          )}

          {addedToCart && (
            <Link to="/cart">
              <button>
                Go to Cart
              </button>
            </Link>
          )}
        </div>
      )}
      <br></br>
      <br></br>
      <br></br>
      <Footer/>
    </div>
  );
};

export default ProductDetails;
