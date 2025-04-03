import React from "react";
import { motion } from "framer-motion";
import "./homePage.css";
import ChartAnimation from "../chartAnimation";
import homeImg1 from "./../../images/homeImg1.png";
import FlipWords from "../../ui/flip-words";
import { useNavigate } from "react-router-dom";

// const ScalableFont = () => {
//   const { scrollYProgress } = useScroll(); // Get the scroll position
//   const fontSize = useTransform(scrollYProgress, [0, 1], ["16px", "48px"]); // Scale font size as you scroll

//   return <motion.p style={{ fontSize }}>Text with Dynamic Font Size</motion.p>;
// };

const Homepage = () => {
  const words = ["crypto prices.", "market trends.", "breaking news."];
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
                maskImage: `url(${homeImg1})`,
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
              <div className="homePage-charts-a">
                <ChartAnimation Coin={"BTC"} />
              </div>
              <div className="homePage-charts-b">
                <ChartAnimation Coin={"ETH"} />
              </div>
              {/* <motion.button className="homePage-charts-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-32-32 0c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6l0-32-32 0c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8l32 0 0-32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z" height="100%" width="100%"/>
                </svg>
              </motion.button> */}
              <div className="homePage-charts-c">
                <ChartAnimation Coin={"SOL"} />
              </div>
              <div className="homePage-charts-d">
                <ChartAnimation Coin={"TRUMP"} />
              </div>
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
