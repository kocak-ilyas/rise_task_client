import { PageHeader } from "antd";
import React from "react";

import logo from "../../assets/logo.png";
import "./style.scss";

const Navbar = () => {
  return (
    <div className='navbarContainer'>
      <PageHeader className='site-page-header'>
        <div className='m-1' style={{ paddingLeft: `5px` }}>
          <img src={logo} alt='logo' style={{ width: `25px` }} />
          <span className='titleLogo'>Rise</span>
        </div>
      </PageHeader>
    </div>
  );
};

export default Navbar;
