import { motion } from "framer-motion";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";
import { CustomDot, CustomTooltip } from "./CustomChartElement";
import { useState, useEffect } from "react";

const ChartAnimation = ({ Coin }) => {
  const APIKey = process.env.API_KEY;
  const [BTCPrice, setBTCPrice] = useState(0);
  const [selected, setSelected] = useState(365);

  const fetchData = async () => {
    const responde = await fetch(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${Coin}&tsym=USD&allData=false&limit=365&api_key={${APIKey}}`
    );
    const parsedData = await responde.json();
    const value = Object.entries(parsedData?.Data?.Data).map((key) => {
    return { name: key[1]?.time, value: key[1]?.close };
    })
    setBTCPrice(value);
    setSelected(value);
  };
  
  useEffect(() => {
    fetchData();
  }, [Coin]);

  const handleSelect = (value) => {
    if (selected !== value) {
      // Prevent unnecessary re-fetching
      setSelected(() => {
        if (value === "W")
          return BTCPrice.slice(-7);
        if (value === "M")
          return BTCPrice.slice(-30);
        if (value === "Y")
          return BTCPrice;
      });
    }
  };

  return (
    <motion.div
      key={Coin}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0e171671",
        backdropFilter: "blur(10px)",
        padding: "40px",
        borderRadius: "20px",
        backgroundSize: "1.3rem 1.3rem",
        outline: "2px solid #97cab933",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
      animate={{ opacity: [0, 1], y: [20, 0] }}
      transition={{ duration: 1 }}
    >
      <motion.div className="text">
        <motion.p
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 2 }}
          style={{
            lineHeight: "0.75",
            paddingBottom: "10px",
            opacity: "0.7",
            width: "100%",
            fontSize: "100%",
          }}
        >
          {Coin}
        </motion.p>
        <motion.div className="button-container">
          {["Y", "M", "W"].map((value) => (
            <motion.button
              key={value}
              onClick={() => handleSelect(value)}
              style={{ cursor: "pointer" }}
              whileHover={{ backgroundColor: "#1c2a2b93" }}
            >
              {value}
            </motion.button>
          ))}
        </motion.div>
        <p style={{ fontSize: "25px", fontWeight: "200", padding: "10px 0" }}>
          {BTCPrice?.[BTCPrice.length - 1]?.value} $
        </p>
      </motion.div>
      <ResponsiveContainer width="100%" style={{ flex: 1 }}>
        <AreaChart data={selected} style={{ cursor: "pointer" }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#25473c2e" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#25473c2e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" hide={true} />
          <YAxis hide={true} />
          <Tooltip content={CustomTooltip} />
          <Area
            dataKey="value"
            stroke="#97cab9"
            strokeWidth={1}
            strokeDasharray={"0 0"}
            fill="url(#colorUv)"
            animationDuration={1000} // Makes animation smoother
            isAnimationActive={true}
            dot={{ r: 0 }}
            activeDot={(props) => (
              <CustomDot {...props} isTooltipActive={true} />
            )}
            style={{ filter: "drop-shadow(1px 1px 2px #97cab9)" }}
          ></Area>
          <CartesianGrid stroke="#ffffff2e" strokeDasharray="16 16" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
export default ChartAnimation;
