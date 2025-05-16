import { animate, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
export const CustomDot = (props) => {
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

export const CustomTooltip = ({ active, payload }) => {
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
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
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
