import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Slider.css'
 
function Slider() {
  return (
    <div  id='acc'>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="mx-auto d-block img-fluid"  
            src="1.avif"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="mx-auto d-block img-fluid"
            src="2.avif"
            alt="Second slide"
          />
        </Carousel.Item>
        {/* Add other Carousel.Item components as needed */}
      </Carousel>
    </div>
  );
}
 
export default Slider;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Carousel } from 'react-bootstrap';

// const Slider = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('https://dummyjson.com/products');
//         console.log('Response data:', response.data);
//         setProducts(response.data.products);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="text-center">
//       <Carousel>
//         {products.map((product) => (
//               <Carousel.Item key={product.id}>
//               <img
//                 className="d-block w-100"
//                 src={product.thumbnail}
//                 alt={product.title}
//                 style={{ width: '500px', height: '300px' }} // Set the width and height here
//               />
//               <Carousel.Caption>
//                 <h3 className='product_title'>{product.title}</h3>
//                 <p><strong>Brand</strong>: {product.brand}</p>
//                 <p>Category: {product.category}</p>
//                 {/* You can add additional details or links here */}
//               </Carousel.Caption>
//             </Carousel.Item>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default Slider;
