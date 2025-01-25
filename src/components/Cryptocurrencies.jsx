import React, { useState, useEffect } from "react";
import { Layout, Card, Row, Col, Input, Statistic } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
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
    }, 500);
  }

  useEffect(fetchData, []);

  useEffect(() => {
    const filteredData = cryptosList?.Data.filter((coin) =>
      coin.CoinInfo?.FullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrencie"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[64, 64]} className="crypto-card-container">
        {cryptos?.map((currency, index) => (
          <Col key={index} xs={24} sm={12} lg={8} className="crypto-card">
            <a
              href={`https://www.cryptocompare.com${currency?.CoinInfo?.Url}/USD`}
              target="_blank"
              rel="noreferrer"
            >
              <Card
                loading={loading}
                bordered={false}
                gap="middle"
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
                  width: "clamp(19.375rem, 5.848vw + 18.132rem, 21.875rem)",
                  borderRadius: "10px",
                  backgroundColor: "#202526",
                  color: "#B9BCCD",
                  aspectRatio: "1 / 1",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
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
                  <p>
                    <b>Marcket cap</b> {currency?.DISPLAY?.USD?.MKTCAP}{" "}
                  </p>
                  <p>
                    <b>Total Volume</b> {currency?.DISPLAY?.USD?.VOLUME24HOURTO}{" "}
                  </p>
                  <p>
                    <b>Launch Date</b> {currency?.CoinInfo?.AssetLaunchDate}{" "}
                  </p>
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
