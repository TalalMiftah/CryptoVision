import { motion, animate } from "framer-motion";
import {
  //   LineChart,
  AreaChart,
  //   Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";
import { useState, useEffect, useRef } from "react";
const CustomDot = (props) => {
  const { cx, cy, value, isTooltipActive } = props;
  if (!isTooltipActive) return null;
  return (
    <>
      <motion.circle
        cx={cx}
        cy={cy}
        r={10}
        fill="#0e1716"
        stroke="#90c0b0"
        strokeWidth={2}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.3, ease: "linear" }}
      />
    </>
  );
};

const CustomTooltip = ({ active, payload }) => {
  const [arrowAnimation, setArrowAnimation] = useState(-180);
  const [prevDeg, setPrevDeg] = useState(-180);
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);

  useEffect(() => {
    const newValue = payload[0]?.value; // Get the new hovered value
    const prevValue = prevValueRef?.current; // Get previous value
    if (active && payload && payload?.length && newValue !== prevValue) {
      // Animate from prevValue to newValue
      const animation = animate(prevValue, newValue, {
        duration: 0.3,
        ease: "circOut", // Smooth out transition
        onUpdate: (latest) => {
          setDisplayValue(Number(latest).toFixed(1));
        }, // Update the display number
      });

      if (prevValue > newValue) {
        setArrowAnimation(() => 0);
        setPrevDeg(() => -180);
      } else {
        setArrowAnimation(() => -180);
        setPrevDeg(() => 0);
      }

      prevValueRef.current = newValue; // Save the new value as the previous one
    }
  }, [active, payload]);
  if (!active || !payload || !payload.length) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 0.5 }}
      exit={{ opacity: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "transparent",
        outline: `solid 4px #97cab9`,
        backdropFilter: "blur(10px)",
        padding: "10px 30px",
        borderRadius: "40px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
      }}
    >
      <motion.p
        // key={displayValue} // Key changes trigger re-animation
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        // style={{ fontSize: "32px", fontWeight: "bold" }}
        style={{ margin: 0, fontWeight: "bold" }}
      >
        {displayValue}
      </motion.p>
      <motion.svg
        initial={{
          transform: `rotate(${arrowAnimation}deg)`,
          height: "60px",
          fill: `#97cab9`,
        }}
        animate={{
          transform: [`rotate(${prevDeg}deg)`, `rotate(${arrowAnimation}deg)`],
        }}
        transition={{ duration: 0.3 }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
      </motion.svg>
    </motion.div>
  );
};

const ChartAnimation = ({ Coin }) => {
  const APIKey = process.env.API_KEY;
  const [BTCPrice, setBTCPrice] = useState(0);
  const [selected, setSelected] = useState(365);

  const fetchData = async () => {
    const responde = await fetch(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${Coin}&tsym=USD&allData=false&limit=${selected}&api_key={${APIKey}}`
    );
    const data = await responde.json();
    setBTCPrice(
      Object.entries(data?.Data?.Data).map((key, value) => {
        return { name: key[1]?.time, value: key[1]?.close };
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [selected, Coin]);

  const handleSelect = (value) => {
    if (selected !== value) {
      // Prevent unnecessary re-fetching
      setSelected(() => {
        if (value === "M") return 30;
        if (value === "W") return 7;
        if (value === "Y") return 365;
      });
    }
  };

  return (
    <motion.div
      key={Coin}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: "1 / 1",
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
            fontSize: "100%"
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
        <AreaChart
          data={BTCPrice}
          style={{ cursor: "pointer" }}
        >
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
            // type="monotone"
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
          >
            {/* <motion.path
              d="M 0 100 L 100 100" // Example path (get actual path from Recharts)
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            /> */}
          </Area>
          <CartesianGrid stroke="#ffffff2e" strokeDasharray="16 16" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
export default ChartAnimation;
