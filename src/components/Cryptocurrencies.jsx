import React, { useState, useEffect } from "react";
import { Layout, Card, Row, Col, Input, Statistic } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [cryptosList, setcryptosList] = useState();
  const [cryptos, setCryptos] = useState(cryptosList?.Data);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  async function fetchData() {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${count}&tsym=USD&api_key={4b73109b800662283c6a16d23d897c1520f7f6a91ccb60a65f8136790f34f946}`
    );
    const json = await response.json();
    setcryptosList(json);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  useEffect(fetchData, []);

  useEffect(() => {
    const filteredData = cryptosList?.Data.filter((coin) =>
      coin.CoinInfo?.FullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  return (
    <div className="cryptocurrencies-container">
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrencie"
            style={{ width: 300, marginRight: "10px", backgroundColor: "#202526", border:"1px solid #ffffff29"}}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[6, 6]} className="crypto-card-container">
        {cryptos?.map((currency, index) => (
          <Col key={index}  xs={24} sm={12} lg={6} style={{ padding:"40px",  width: "200px", display: "flex", alignItems:"center", justifyContent:"center", aspectRatio: "1 / 1", }} className="crypto-card">
              <Card
                loading={loading}
                bordered={false}
                title={`${currency?.CoinInfo?.FullName}`}
                extra={
                  <>
                    <img
                      className="crypto-image"
                      src={`https://www.cryptocompare.com${currency?.CoinInfo?.ImageUrl}`}
                    />
                  </>
                }
                hoverable
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#202526",
                  color: "#B9BCCD",
                  height:"100%",
                  width:"100%"
                }}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap:"20px"
                  }}
                >
                  <Statistic
                    style={{ fontSize:"40px" }}
                    value={currency?.DISPLAY?.USD?.CHANGEPCTHOUR < 0 ? currency?.DISPLAY?.USD?.CHANGEPCTHOUR * -1 : currency?.DISPLAY?.USD?.CHANGEPCTHOUR}
                    valueStyle={
                        currency?.DISPLAY?.USD?.CHANGEPCTHOUR >= 0
                      ? { color: "#80EE63" }
                        : { color: "#EEB263" }
                    }
                    prefix={
                      currency?.DISPLAY?.USD?.CHANGEPCTHOUR >= 0 ? (
                        <ArrowUpOutlined style={{ paddingRight: '10px' }}/>
                      ) : (
                        <ArrowDownOutlined style={{ paddingRight: '10px' }}/>
                      )
                    }
                    suffix="%"
                  />
                   <p>
                    <b>Symbol </b> {currency?.CoinInfo?.Name}{" "}
                  </p>
                  <p>
                    <b>Price </b> {currency?.DISPLAY?.USD?.PRICE}{" "}
                  </p>
                  {/*<p>
                    <b>Marcket cap</b> {currency?.DISPLAY?.USD?.MKTCAP}{" "}
                  </p>
                  <p>
                    <b>Total Volume</b> {currency?.DISPLAY?.USD?.VOLUME24HOURTO}{" "}
                  </p>
                  <p>
                    <b>Launch Date</b> {currency?.CoinInfo?.AssetLaunchDate}{" "}
                  </p> */}
                  <div className="provider-container">
                  {/* <a href={news.url} target="_blank" rel="noreferrer"> */}
                    <ArrowRightOutlined />
                  {/* </a> */}
                  </div>
                </div>
              </Card>
            {/* </a> */}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cryptocurrencies;
