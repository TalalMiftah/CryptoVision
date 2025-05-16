import React from 'react';
import Navbar from "./components/Navbar/Navbar"
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import CurrencyConverter from "./components/CryptoConverter/CurrencyConverter"
import Homepage from "./components/Homepage/Homepage"
import News from "./components/News/News"
import NotFondPage from './components/NotFound/NotFondPage';
import CryptoCurrencies from "./components/CryptoCurrencies/CryptoCurrencies"

import './index.css';

const App = () => {  
  return (
    <div className="app" >
      <Layout style={{ background: "none" }}>
          <div className="navbar">
          <Navbar />
          </div>
            <div className="routes">
              <Routes >
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/currencyconverter" element={<CurrencyConverter />} />
                <Route exact path="/cryptocurrencies" element={<CryptoCurrencies />} />
                <Route exact path="/news" element={<News />} />
                <Route path='*' element={<NotFondPage />} />
              </Routes>
          </div>
        </Layout>
    </div>
  )
}

export default App
