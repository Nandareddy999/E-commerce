import React from 'react';
import "./Footer.css"

const Footer = () => {
    return (
        <footer className='footer' >
            <div className="container p-4">
                <div className="row mt-4">
                    <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase mb-4">Start Purchasing!!</h5>
                        <p style={{ textAlign: 'justify' }}>Welcome to Teamc, where your shopping experience
                            meets convenience and quality.we strive to provide an unparalleled online shopping destination
                            for all your needs.<br />
                            Join our community of satisfied shoppers and discover the convenience of shopping with us.
                            Thank you for choosing Teamc, where quality meets convenience, every time you click.
                        </p>
                    </div>
                
                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0">

                        <ul className="fa-ul" style={{ marginLeft: '1.8em', marginTop:'3.8rem' }}>
                            <li className="mb-3">
                                <span className="fa-li btn p-1"><i className="fas fa-home"></i></span><span className="ms-2 p-1">Taramani,Chennai</span>
                            </li>
                            <li className="mb-3">
                                <span className="fa-li btn p-1"><i className="fas fa-envelope"></i></span><span className="ms-2 p-1">contact@example.com</span>
                            </li>
                            <li className="mb-3">
                                <span className="fa-li btn p-1"><i className="fas fa-phone"></i></span><span className="ms-2 p-1">+ 48 234 567 88</span>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4 mb-md-0 mt-4 pt-3">
                        <p>Follow us </p> <div>
                            <a href="#!" className="btn btn-floating btn-lg mr-1"><i className="fab fa-facebook-f"></i></a>
                            {/* Twitter */}
                            <a href="#!" className="btn btn-floating btn-lg mr-1"><i className="fab fa-twitter"></i></a>
                            {/* Google + */}
                            <a href="#!" className="btn-floating btn-lg mr-1"><i className="fab fa-google-plus-g"></i></a>
                            {/* Linkedin */}
                        </div>
                        <p>Call us: +91 xxxxx xxxxx</p>
                    </div>
                
                </div>
            </div>
            {/* Copyright */}
            <div className="text-center p-3" style={{ backgroundColor: '#363636' }}>
                © 2024 Copyright:
                <a className="text-white" href="#!"> Team C</a>
            </div>
            {/* Copyright */}
        </footer>
    );
};

export default Footer;
