import React from 'react'
// import ReactDOM from 'react-dom'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import 'antd/dist/antd.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Router>
    <App />
  </Router>,
  // document.getElementById('root')
);