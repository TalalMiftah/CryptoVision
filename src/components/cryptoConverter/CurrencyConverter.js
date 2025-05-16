import { useState, useEffect } from "react";
import { SwapOutlined } from "@ant-design/icons";
import { Input, Card } from "antd";
import millify from "millify";
import "./CryptoConverter.css";
const CurrencyConverter = () => {
  const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA", "JPY", "NEO"];

  const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC");

  const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("BTC");

  const [amount, setAmount] = useState(1);

  const [result, setResult] = useState(0);

  const [exchangedData, setExchangedData] = useState({
    primaryCurrency: "BTC",

    secondaryCurrency: "BTC",

    exchangeRate: 0,
  });
  async function fetchData() {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${chosenPrimaryCurrency}&tsyms=${chosenSecondaryCurrency}&api_key={4b73109b800662283c6a16d23d897c1520f7f6a91ccb60a65f8136790f34f946}`
    );
    const json = await response.json();
    setResult(json[chosenSecondaryCurrency] * amount);
    setExchangedData({
      primaryCurrency: chosenPrimaryCurrency,
      secondaryCurrency: chosenSecondaryCurrency,
      exchangeRate: json[chosenSecondaryCurrency],
    });
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="currency-converter">
      <div className="input-box">
        <div className="cov">
          <Card
            className="currency-converter-card"
            style={{ padding: "10px", borderRadius: "10px" }}
          >
            <h4>FROM</h4>
            <Input
              type="number"
              name="currency-amount-1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              value={chosenPrimaryCurrency}
              name="currency-option-1"
              className="currency-options"
              onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency}>{currency}</option>
              ))}
            </select>
          </Card>
        </div>
        <SwapOutlined
          className="covertb"
          id="convert-button"
          onClick={fetchData}
        ></SwapOutlined>
        <div className="cov">
          <Card
            className="currency-converter-card"
            style={{ borderRadius: "10px", padding: "10px" }}
          >
            <h4>TO</h4>
            <Input name="currency-amount-2" value={result} />
            <select
              value={chosenSecondaryCurrency}
              name="currency-option-2"
              className="currency-options"
              onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency}>{currency}</option>
              ))}
            </select>
          </Card>
        </div>

        <div className="exchange-rate">
          <Card>
            <div className="excenter">
              <h1>Exchange Rate</h1>
              <h2>{millify(exchangedData.exchangeRate)}</h2>
              <p>
                {exchangedData.primaryCurrency} to{" "}
                {exchangedData.secondaryCurrency}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
