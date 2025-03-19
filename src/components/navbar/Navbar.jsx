import React from "react";
import { Menu, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import icon from "../../images/logo.svg";
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import "./navbar.css"

const Navbar = () => {
  const menuItems = [
    { label: "Home", key: "/" },
    { label: "CryptoCurrencies", key: "/cryptocurrencies" },
    { label: "News", key: "/news" },
    { label: "Currency Converter", key: "/currencyconverter" },
  ];
  const navigate = useNavigate();

  return (
    <div className="nav-container">
      <Avatar
        src={icon}
        className="logo-container"
      />
      <Menu
        onClick={(e) => navigate(e.key)}
        items={menuItems}
        theme="dark"
        className="nav-menu"
      />
    </div>
  )
};

export default Navbar;