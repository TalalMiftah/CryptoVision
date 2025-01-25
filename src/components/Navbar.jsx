import React from "react";
import { Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import icon from "../images/logo.svg";
const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar
          src={icon}
          style={{ width: "fit-content", borderRadius: "0px" }}
        />
      </div>
      <Menu
        theme="dark"
        style={{
          width: "fit-content",
          justifyContent: "space-between",
          alignContent: "center",
          gap: "25px",
          background: "none",
          borderRadius: "7px",
          width:"50%",
        }}
      >
        <Menu.Item
          key="home"
          style={{ marginRight: "20px" }}
        >
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item
          key="cryptocurrencies"
          style={{ marginRight: "20px" }}
        >
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item
          key="currencyconverter"
          style={{ marginRight: "20px" }}
        >
          <Link to="/currencyconverter">Currency Converter</Link>
        </Menu.Item>
        <Menu.Item
          key="news"
          style={{ marginRight: "20px" }}
        >
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
