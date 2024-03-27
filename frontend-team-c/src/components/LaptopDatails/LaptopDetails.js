import React, { useState, useEffect } from 'react';
import Navbartemp from "../Navbar/Navbartemp";
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom';
import RandomBackgroundColor from '../HomePage/RandomBackgroundColor'; 

function LaptopDetails() {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    async function fetchLaptops() {
      try {
        const response = await fetch(
          "https://teamcapi.onrender.com/products/category/laptops"
        );
        const { products } = await response.json();

        if (Array.isArray(products)) {
          const laptopsData = products.map((product) => ({
            id: product._id, // Assuming "_id" is the unique identifier
            name: product.name,
            src: product.images[0],
            alt: product.title,
            text: product.productDesc,
            subText: `Price: $${product.price}`,
          }));
          setLaptops(laptopsData);
        } else {
          console.error("Products data is not an array:", products);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchLaptops();
  }, []);

  return (
    <div>
      <Navbartemp/>
      <br></br>
          <br></br>
          <br></br>
         

      <h1 className='categorytitle'>Laptops</h1>
      <div className="text-center">
        {laptops.map((item) => (
          <RandomBackgroundColor key={item.id} className="col-md-3">
            <Link to={`/products/${item.id}`}>
              <div className="" style={{textDecoration:"none"}}>
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

export default LaptopDetails;




// import React from "react";
// import { useState, useEffect } from "react";
// import RandomBackgroundColor from "../HomePage/RandomBackgroundColor";



// function LaptopDetails() {
//   const [laptops, setLaptops] = useState([]);
//   useEffect(() => {
//     async function fetchLaptops() {
//       try {
//         const response = await fetch(
//           "https://teamcapi.onrender.com/products/category/laptops"
//         );
//         const { products } = await response.json();

//         if (Array.isArray(products)) {
//           const laptopsData = products.map((product) => ({
//             name: product.name,
//             src: product.images[0],
//             alt: product.title,
//             text: product.productDesc,
//             subText: `Price: $${product.price}`,
//           }));
//           setLaptops(laptopsData);
//         } else {
//           console.error("Products data is not an array:", products);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchLaptops();
//   }, []);

//   return (
//     <div >
//         <Navbartemp/>
//       <br></br>
//       <br></br>

//       <h1 className="categorytitle">Laptops</h1>
//       <div className="row text-center">
//         {laptops.map((item) => (
//           <RandomBackgroundColor key={item.id} className="col-md-3">
//             <div >
//               <div className="image-css">
//                 <img src={item.src} alt={item.alt} className="img-fluid" />
//               </div>
//               <p className="ptext">{item.name}</p>
//               <p className="ptext">{item.text}</p>
//               <p className="ptext">{item.subText}</p>
//             </div>
//           </RandomBackgroundColor>
//         ))}
//       </div>
//       <Footer/>
//     </div>
//   );
// }

// export default LaptopDetails;
