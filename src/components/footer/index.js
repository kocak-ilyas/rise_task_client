import React from "react";
import logo from "../../assets/logo.png";

import "./style.scss";

const Footer = () => {
  return (
    <div className='container' style={{ marginTop: `150px` }}>
      <footer className='py-3 my-4'>
        <ul className='nav justify-content-center border-bottom pb-3 mb-3'>
          <li className='nav-item'>
            <a href='/' className='nav-link px-2 text-muted'>
              Home
            </a>
          </li>
          <li className='nav-item'>
            <a href='/contact' className='nav-link px-2 text-muted'>
              Contact
            </a>
          </li>
        </ul>
        <p className='text-center text-muted'>
          <img src={logo} alt='logo' style={{ width: `18px`, marginRight: "20px", marginTop: "-9px" }} /> &copy; 2022
          Rise Company, Inc
        </p>
      </footer>
    </div>
  );
};

export default Footer;
