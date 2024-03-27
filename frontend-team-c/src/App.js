import "./App.css";
import { BrowserRouter as Router,Routes, Route, Switch, Link } from "react-router-dom";
import Navbartemp from "./components/Navbar/Navbartemp";
import Products from "./components/Products/Products";
import Slider from "./components/Slider/Slider";
import Userbox from "./components/signin signup/Userbox";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Cartpg from "./pages/Cartpg";
import Signpg from "./pages/Signpg";
import HomePage from './components/HomePage/HomePage'
import ProductDetails from "./components/ProductDetails/ProductDetails";
import LaptopDetails from "./components/LaptopDatails/LaptopDetails";
import SmartPhones from "./components/SmartPhones/SmartPhones";
import Thanku from "./pages/Thanku";


function App() {
  return (
    
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/signin" element={<Signpg />}/>
      <Route path="/cart" element={<Cartpg />}/>
      <Route path="/proapi" element={<HomePage/>} />
      <Route path="/laptopdata" element={<LaptopDetails/> } />
      <Route path="/smartphoneData" element={ <SmartPhones />} />
      <Route path="/products/:_id" element={<ProductDetails />} />
      <Route path="/thanku" element={<Thanku/>} />



    </Routes>
    </Router>
  );
}

export default App;
