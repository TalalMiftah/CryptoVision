import React from "react";
import { motion } from "framer-motion";
import "./HomePage.css";
import ChartAnimation from "./ChartAnimation/ChartAnimation";
import homeImg from "./../../images/homeImg.png";
import FlipWords from "../../ui/flip-words";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const words = ["crypto prices.", "market trends.", "breaking news."];
  const displayedCoins = ["BTC", "ETH", "SOL", "TRUMP"];
  const navigate = useNavigate();
  const backgroundImageAnimation = [
    "radial-gradient(circle at center, rgb(108, 108, 108) 0.1rem, transparent 0)",
    "radial-gradient(circle at center, rgb(255, 255, 255, 0.8) 0.1rem, transparent 0)",
    "radial-gradient(circle at center, rgb(108, 108, 108) 0.1rem, transparent 0)",
  ];

  return (
    <>
      <section className="home-container">
        <div className="home-title-container">
          <div className="home-title">
            <div className="home-title-header" >
              Welcome to CryptoVerse <br />
              Here you Can Find <br />
              the latest <FlipWords words={words} />
            </div>
            <motion.div
              initial={{
                scale: 1.5,
              }}
              style={{
                backgroundSize: "1.3rem 1.3rem",
                width: "100%",
                height: "500px",
                maskImage: `url(${homeImg})`,
                maskRepeat: "no-repeat",
                maskSize: "auto 500px",
                position: "absolute",
                left: "10%",
                top: "10%",
                bottom: 0,
                margin: "auto",
                zIndex: "-1",
              }}
              animate={{
                backgroundPosition: ["0 0", "1.3rem 0"],
                backgroundImage: backgroundImageAnimation,
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 5,
                ease: "linear",
              }}
            />
            <motion.div
              className="homePage-charts-container"
              style={{
                width: "38vw",
                aspectRatio: "16 / 14",
                position: "absolute",
                right: "0",
                display: "grid",
                gridTemplateColumns: "repeat(14, 1fr)",
                gridTemplateRows: "repeat(14, 1fr)",
                gap: "10px",
              }}
            >
              <>
                {displayedCoins?.map((coin, key) => (
                  <div key={key} className={`homePage-charts-${key}`} >
                    <ChartAnimation Coin={coin} />
                  </div>
                ))}
              </>
            </motion.div>
          </div>
          <motion.button
            initial={{ fill: "#FFFFFF" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{
              scale: 1,
              color: "#373B3C",
              fill: "#373B3C",
              backgroundColor: "#C7C7C7",
            }}
            transition={{ duration: 0.1 }}
            onClick={() =>  navigate("/cryptocurrencies")}
            className="Top5"
          >
            Currencies
            <motion.svg
              className="Arrow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </motion.svg>
          </motion.button>
          <motion.button
            initial={{ fill: "#FFFFFF" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{
              scale: 1,
              color: "#373B3C",
              fill: "#373B3C",
              backgroundColor: "#C7C7C7",
            }}
            transition={{ duration: 0.1 }}
            onClick={() =>  navigate("/news")}
            className="Top5"
          >
            News
            <motion.svg
              className="Arrow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </motion.svg>
          </motion.button>
        </div>
      </section>
    </>
  );
};

export default Homepage;
