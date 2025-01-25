import CurrencyConverter from "./components/cryptoConverter/CurrencyConverter"
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import {LinkedinOutlined,FacebookOutlined,TwitterOutlined,InstagramOutlined  } from '@ant-design/icons'
import {  Homepage, News, Cryptocurrencies, Navbar } from './components';
import './index.css';
const App = () => {
  return (

    <div className="app" >
      <Layout style={{background: "none"}}>
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="main" >
          <div className="routes">
            <Routes >
            <Route exact path="/" element={<Homepage/>}/>
            <Route exact path="/currencyconverter" element={<CurrencyConverter/>}/>
            <Route exact path="/cryptocurrencies" element={<Cryptocurrencies/>}/>
            <Route exact path="/news" element={<News/>}/>
            </Routes>
          </div>
        <div className="footer">
          <Space style={{color: '#fff'}}>
            <InstagramOutlined />
            <TwitterOutlined />
            <FacebookOutlined />
            <LinkedinOutlined />
          </Space>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            @2022  CryptoNews | All Rights Reserved<br />
          </Typography.Title>
        </div>
      </div>
      </Layout>
    </div>
  )
}

export default App
