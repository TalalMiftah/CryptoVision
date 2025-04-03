import React from 'react';
import Navbar from "./components/navbar/Navbar"
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import CurrencyConverter from "./components/cryptoConverter/CurrencyConverter"
import Homepage from "./components/Homepage/Homepage"
import News from "./components/News/News"
import Cryptocurrencies from "./components/Cryptocurrencies"
import './index.css';
const App = () => {
  
  return (
    <div className="app" >
      <Layout style={{ background: "none" }}>
          <div className="navbar">
          <Navbar />
          </div>
          <div className="main" >
            <div className="routes">
              <Routes >
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/currencyconverter" element={<CurrencyConverter />} />
                <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
                <Route exact path="/news" element={<News />} />
              </Routes>
            </div>
          </div>
        </Layout>
    </div>
  )
}

export default App
