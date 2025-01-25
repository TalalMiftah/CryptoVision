import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Statistic } from "antd";
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

  // if (!cryptosList) return <LoadingOutlined />
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
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency, index) => (
          <Col key={index} xs={24} sm={12} lg={8} className="crypto-card">
            <a
              href={`https://www.cryptocompare.com${currency?.CoinInfo?.Url}/USD`}
              target="_blank"
              rel="noreferrer"
            >
              <Card
                loading={loading}
                gap="middle"
                title={`${currency?.CoinInfo?.FullName}`}
                extra={
                  <img
                    className="crypto-image"
                    src={`https://www.cryptocompare.com${currency?.CoinInfo?.ImageUrl}`}
                  />
                }
                hoverable
                style={{ borderRadius: "10px", minHeight: "350px" }}
              >
                <div style={{height: "100%"}}>
                  <Statistic
                    value={currency?.DISPLAY?.USD?.CHANGEPCTHOUR}
                    valueStyle={
                      currency?.DISPLAY?.USD?.CHANGEPCTHOUR > 0
                        ? { color: "#3f8600" }
                        : { color: "#cf1322" }
                    }
                    prefix={
                      currency?.DISPLAY?.USD?.CHANGEPCTHOUR > 0 ? (
                        <ArrowUpOutlined />
                      ) : (
                        <ArrowDownOutlined />
                      )
                    }
                    suffix="%"
                  />
                  <p>Symbol : {currency?.CoinInfo?.Name} </p>
                  <p>Price : {currency?.DISPLAY?.USD?.PRICE} </p>
                  <p>Marcket cap : {currency?.DISPLAY?.USD?.MKTCAP} </p>
                  <p>
                    Total Volume : {currency?.DISPLAY?.USD?.VOLUME24HOURTO}{" "}
                  </p>
                  <p>Launch Date : {currency?.CoinInfo?.AssetLaunchDate} </p>
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
