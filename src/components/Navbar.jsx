import React from 'react'
import {Menu, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, SwapOutlined , BulbOutlined, FundOutlined} from '@ant-design/icons'
import icon from '../images/logo.svg'
const Navbar = () => {  
    return (
        <div className='nav-container' >
            <div className='logo-container'>
                <Avatar src={icon} style={{width: "fit-content", borderRadius: "0px"}} />
            </div>
            <Menu theme="dark" style={{justifyContent:"center"}}>
                <Menu.Item icon={<HomeOutlined />} key="home" style={{marginRight:"20px"}}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />} key="cryptocurrencies" style={{marginRight:"20px"}}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<SwapOutlined />} key="currencyconverter" style={{marginRight:"20px"}}>
                    <Link to="/currencyconverter">Currency Converter</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />} key="news" style={{marginRight:"20px"}}>
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu> 
        </div>
    )
}

export default Navbar