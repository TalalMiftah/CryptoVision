import { React, useState } from "react";
import { Typography, Row, Col, Card, Input, Select } from "antd";
import { useEffect } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import "./news.css"

let isMounted = true;

const News = ({ simplified }) => {
  const { Option } = Select;
  const [cryptoNews, setcryptoNews] = useState();
  const [cryptoN, setcryptoN] = useState(cryptoNews?.Data);
  const [searchTerm, setSearchTerm] = useState("");
  const [lang, setlang] = useState("EN");
  const [loading, setLoading] = useState(true);
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
  const url = `https://min-api.cryptocompare.com/data/v2/news/?lang=${lang}&api_key={4b73109b800662283c6a16d23d897c1520f7f6a91ccb60a65f8136790f34f946}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (isMounted) {
          setcryptoNews(json);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [url]);
  useEffect(() => {
    const filteredData = cryptoNews?.Data?.filter((coin) =>
      coin.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setcryptoN(filteredData);
  }, [cryptoNews, searchTerm]);
  if (!cryptoNews?.Data) return "Loading...";
  return (
    <div className="news-container">
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Coin News"
            className="search-news"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            onChange={(value) => setlang(value)}
            className="search-news-select"
            defaultValue="English"
          >
            <Option value="EN" >English</Option>
            <Option value="PT" >Portuguese</Option>
          </Select>
        </div>
      )}
      <Row style={{ width: "80%" }} gutter={[64, 64]}>
        {cryptoN?.map((news, i) => (
          news?.body.length > 500 && (
            <Col
              xs={24}
              sm={12}
              xl={8}
              key={i}
            >
              <Card
                bordered={false}
                loading={loading}
                className="news-card"
              >
                <div
                  className="news-card-container"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div className="news-image-container" style={{ display: "flex", justifyContent: "center" }}>
                    <Typography.Title className="news-title" level={3} style={{ height: "fit-content" }}>
                      {news.title.slice(0, 60)}...
                    </Typography.Title>
                    <img
                      style={{ maxWidth: "200px", maxHeight: "100px", borderRadius: "10px" }}
                      src={news?.imageurl || demoImage}
                      alt="news"
                    />
                  </div>
                  <p>
                    {news?.body?.length > 700
                      ? `${news?.body.slice(0, 700)}...`
                      : news?.body}
                  </p>
                  <div className="provider-container">
                    <a href={news.url} target="_blank" rel="noreferrer">
                      <ArrowRightOutlined />
                    </a>
                  </div>
                </div>
              </Card>
            </Col>)
        ))}
      </Row>
    </div>
  );
};

export default News;
