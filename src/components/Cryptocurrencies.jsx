import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { easeIn } from "framer-motion/dom";
import ChartAnimation from "./chartAnimation";
import { dialog, filter } from "framer-motion/m";
import { duration } from "moment";

const Cryptocurrencies = () => {
  const AnimatedCol = motion(Col);
  const AnimatedCard = motion(Card);
  const [cryptos, setCryptos] = useState(null);
  const [isClicked, setIsClicked] = useState(null);

  const variants = {
    introAnimation: {
      opacity: [0, 1],
      scale: [0, 1.1, 1],
      filter: ["blur(20px)", "blur(0px)"],
    },
    expandCard: {
      // opacity: [0, 1],
      // scale: [1, 2],
      // filter: ["blur(20px)", "blur(0px)"],
    },
  };

  const cardStyle = {
    borderRadius: "10px",
    backgroundColor: "rgba(14, 23, 22, 0.443)",
    color: "#ffffffcc",
    width: "100%",
    backdropFilter: "blur(4px)",
    outline: "rgba(151, 202, 185, 0.2) solid 1px",
    aspectRatio: "16 / 9",
    // background: `url(https://www.cryptocompare.com${currency?.CoinInfo?.ImageUrl})`,
  };

  const [introAnimation, setIntroAnimation] = useState(true);
  const APIKey = process.env.API_KEY;
  async function fetchData() {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD&api_key={${APIKey}}`
    );
    const json = await response.json();
    setCryptos(json?.Data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!cryptos) return;
  <motion.div>Loading...</motion.div>;

  return (
    <AnimatePresence>
      <div className="cryptocurrencies-container">
        <h1 className="cryptocurrencies-header"> Coins List </h1>
        <div className="cryptocurrencies">
          <Row gutter={[24, 24]} className="crypto-card-container">
            {cryptos?.map((currency, index) => (
              <AnimatedCol
                key={currency?.CoinInfo?.Id}
                // xs={24}
                // sm={12}
                // lg={8}
                // xl={6}
                // xxl={4}
                span={index === isClicked ? 8 : 4}
                style={{
                  height: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="crypto-card"
                layout
              >
                <AnimatedCard
                  layout
                  variants={variants}
                  initial={introAnimation && { opacity: 0, scale: 0 }}
                  style={cardStyle}
                  animate={() => {
                    if (introAnimation) return "introAnimation";
                    if (index === isClicked) return "expandCard";
                  }}
                  transition={{
                    delay: index / (10 + index * 2),
                    duration: index / (10 + index * 2),
                    ease: easeIn,
                  }}
                  bordered={false}
                  onClick={(e) => {
                    setIsClicked(index);
                    setIntroAnimation(false);
                  }}
                  extra={
                    <div className="custom-card-title">
                      <h1 style={{ color: "#C7C7C7" }}>
                        {currency?.CoinInfo?.Name}
                      </h1>
                    </div>
                  }
                  hoverable
                  onAnimationComplete={() => {
                    if (index === cryptos?.length - 1) setIntroAnimation(false);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      gap: "20px",
                      position: "relative",
                    }}
                  >
                    <Statistic
                      style={{ fontSize: "30px" }}
                      value={
                        currency?.DISPLAY?.USD?.CHANGEPCTHOUR < 0
                          ? currency?.DISPLAY?.USD?.CHANGEPCTHOUR * -1
                          : currency?.DISPLAY?.USD?.CHANGEPCTHOUR
                      }
                      valueStyle={
                        currency?.DISPLAY?.USD?.CHANGEPCTHOUR >= 0
                          ? { color: "#62ad88" }
                          : { color: "#ad6c62" }
                      }
                      prefix={
                        currency?.DISPLAY?.USD?.CHANGEPCTHOUR >= 0 ? (
                          <CaretUpOutlined style={{ paddingRight: "10px" }} />
                        ) : (
                          <CaretDownOutlined style={{ paddingRight: "10px" }} />
                        )
                      }
                      suffix="%"
                    />
                    {index !== isClicked && (
                      <div className="crypto-card-price">
                        {currency?.DISPLAY?.USD?.PRICE
                          ? currency?.DISPLAY?.USD?.PRICE.split("$")
                          : 0}{" "}
                        $
                      </div>
                    )}
                    {index === isClicked && (
                      // <motion.div
                      // key="modal"
                      // initial={{opacity: 0, zIndex: 10, width: "100%", height: "100%"}}
                      // animate={{ backgroundColor: ["#000000", "#000000cc"], opacity: [0, 1], filter: ["blur(40px)", "blur(0px)"]}}
                      // exit={{ opacity: 0, filter: "blur(40px)" }}
                      // style= {{ position: "absolute", top: "0", left: "0" }}
                      // transition={{ duration: 0.2, ease: easeInOut }}
                      // onClick={() => setIsClicked(null)}
                      // >
                        <motion.div className="chart-parent"
                          layout
                          // initial={{width: 0, opacity: 0}}
                          // animate={{ width: [0, "100%"] , opacity: 1}}
                        >
                          <ChartAnimation Coin={currency?.CoinInfo?.Name} />
                        </motion.div>
                      // </motion.div>
                    )}
                  </div>
                </AnimatedCard>
              </AnimatedCol>
            ))}
          </Row>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Cryptocurrencies;
