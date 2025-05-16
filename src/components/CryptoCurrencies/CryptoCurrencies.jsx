import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { easeIn } from "framer-motion/dom";
import "./CryptoCurrencies.css"

const CryptoCurrencies = () => {
  const AnimatedCol = motion(Col);
  const AnimatedCard = motion(Card);
  const [cryptos, setCryptos] = useState(null);

  const variants = {
    introAnimation: {
      opacity: [0, 1],
      scale: [0, 1.1, 1],
      filter: ["blur(20px)", "blur(0px)"],
    }
  };

  const cardStyle = {
    borderRadius: "10px",
    backgroundColor: "rgba(14, 23, 22, 0.443)",
    color: "#ffffffcc",
    width: "100%",
    backdropFilter: "blur(4px)",
    outline: "rgba(151, 202, 185, 0.2) solid 1px",
    aspectRatio: "16 / 9",
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
            {cryptos?.map((currency, index) => {
              const coinDisplay = currency?.DISPLAY?.USD;
              return (
                <AnimatedCol
                key={currency?.CoinInfo?.Id}
                xs={24}
                sm={12}
                lg={8}
                xl={6}
                xxl={4}
                span={4}
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
                  }}
                  transition={{
                    type: "tween",
                    delay: index * 0.01,
                    duration: index * 0.01,
                    ease: easeIn,
                  }}
                  bordered={false}
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
                        coinDisplay?.CHANGEPCTHOUR < 0
                          ? coinDisplay?.CHANGEPCTHOUR * -1
                          : coinDisplay?.CHANGEPCTHOUR
                      }
                      valueStyle={
                        coinDisplay?.CHANGEPCTHOUR >= 0
                          ? { color: "#62ad88" }
                          : { color: "#ad6c62" }
                      }
                      prefix={
                        coinDisplay?.CHANGEPCTHOUR >= 0 ? (
                          <CaretUpOutlined style={{ paddingRight: "10px" }} />
                        ) : (
                          <CaretDownOutlined style={{ paddingRight: "10px" }} />
                        )
                      }
                      suffix="%"
                    />
                      <div className="crypto-card-price">
                        {coinDisplay?.PRICE
                          ? coinDisplay?.PRICE.split("$")
                          : 0}{" "}
                        $
                      </div>
                  </div>
                </AnimatedCard>
              </AnimatedCol>
          )})}
          </Row>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CryptoCurrencies;