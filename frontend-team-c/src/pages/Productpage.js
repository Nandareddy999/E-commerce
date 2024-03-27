import React from 'react'
import Navbartemp from '../components/Navbar/Navbartemp'
import Accordion from '../components/Accordion/Accordion';
import Products from "../components/Products/Products";
import Slider from "../components/Slider/Slider";
// import Userbox from "../components/signin signup/Userbox";
// import Cart from "../components/Cart/Cart";
import Footer from "../components/Footer/Footer";
import '../App.css'

const Productpage = () => {
  return (
    <div id='main'>
        <Navbartemp/>
        <Slider/>
        <Products/>
        <Accordion/>
        <Footer/>

    </div>
        
  )
}

export default Productpage