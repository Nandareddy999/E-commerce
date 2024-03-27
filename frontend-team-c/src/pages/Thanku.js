import React from 'react'
import Navbartemp from '../components/Navbar/Navbartemp'
import Accordion from '../components/Accordion/Accordion';
import Products from "../components/Products/Products";
import Slider from "../components/Slider/Slider";
// import Userbox from "../components/signin signup/Userbox";
// import Cart from "../components/Cart/Cart";
import Footer from "../components/Footer/Footer";
import '../App.css'
import { useNavigate } from "react-router-dom";


const Thanku = () => {
    const navigate = useNavigate();
  return (
    <div id='main'>
    <Navbartemp/>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    <h1 className='categorytitle'>Thanks for purchasing with us :)</h1>
    <br></br>
    <br></br>
    <div className='categorytitle'>
    <button  
                        href="#!"
                        className="text-body butn"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        <i className="fas fa-long-arrow-alt-left me-2"></i>
                        Continue shopping
                      </button></div>


    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    <Footer/>

</div>
  )
}

export default Thanku