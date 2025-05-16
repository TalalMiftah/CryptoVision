import { React, useState } from "react";
import { Typography, Row, Col, Card } from "antd";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./News.css";
import _ from "lodash";

const News = () => {
  const [cryptoNews, setcryptoNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const AnimatedCard = motion(Card);
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
  const url = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key={4b73109b800662283c6a16d23d897c1520f7f6a91ccb60a65f8136790f34f946}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setcryptoNews(_.shuffle(json?.Data));
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!cryptoNews || cryptoNews.length === 0) return "Loading...";
  return (
    <div className="news-container">
      <Row style={{ width: "80%" }} gutter={[32, 32]}>
        {cryptoNews?.map(
          (news, i) =>
              <Col xs={24} sm={12} xl={6} key={i}>
                <AnimatedCard
                  bordered={false}
                  loading={loading}
                  className="news-card"
                  cover={
                    <>
                      <img
                        style={{ width: "100%" }}
                        src={news?.imageurl || demoImage}
                        alt="news"
                      />
                    </>
                  }
                >
                  <div
                    className="news-card-container"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Typography.Title
                      className="news-title"
                      level={4}
                      style={{
                        height: "fit-content",
                        width: "100%",
                        paddingTop: "30px",
                      }}
                    >
                      {news.title}
                    </Typography.Title>
                    <div className="provider-container">
                      <a href={news.url} target="_blank" rel="noreferrer">
                        <ArrowRightOutlined />
                      </a>
                    </div>
                  </div>
                </AnimatedCard>
              </Col>
            )
        }
      </Row>
    </div>
  );
};

export default News;
