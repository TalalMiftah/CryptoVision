import React from "react";
import { Menu, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo.svg";
import { useLocation } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import "./Navbar.css";

const Navbar = () => {
  const menuItems = [
    { label: "Home", key: "/" },
    { label: "CryptoCurrencies", key: "/cryptocurrencies" },
    { label: "News", key: "/news" },
    { label: "Currency Converter", key: "/currencyconverter" },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="nav-container">
      <Avatar src={Logo} className="logo-container" onClick={() => navigate('/')}/>
      <div className="nav-menu-container">
        <Menu
          onClick={(e) => {
            navigate(e.key);
          }}
          items={menuItems}
          theme="dark"
          className="nav-menu"
          defaultSelectedKeys={['/']}
          selectedKeys={[location?.pathname]}
        />
      </div>
      <div className="search-container">
        <input className="search" type="text" placeholder="Search" />
        <SearchOutlined style={{ position:"absolute", margin:"auto", top:"0", bottom:"0", right:"30px", fill: "" }} />
      </div>
    </div>
  );
};

export default Navbar;
