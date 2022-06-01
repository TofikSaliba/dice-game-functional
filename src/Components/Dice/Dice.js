import React, { useEffect, useState } from "react";
import { useRollFuncs } from "../../context/ContextProvider";
import "./Dice.css";
const IMAGES = {
  1: require("../../assets/images/dice-1.png"),
  2: require("../../assets/images/dice-2.png"),
  3: require("../../assets/images/dice-3.png"),
  4: require("../../assets/images/dice-4.png"),
  5: require("../../assets/images/dice-5.png"),
  6: require("../../assets/images/dice-6.png"),
};

function Dice({ rolling }) {
  const { setRollFuncs } = useRollFuncs();
  const [roll, setRoll] = useState(6);

  const rollNum = () => {
    let random1 = (Math.random() * 6 + 1) | 0;
    let intID = setInterval(() => {
      let random = (Math.random() * 6 + 1) | 0;
      setRoll(random);
    }, 100);
    setTimeout(() => {
      setRoll(random1);
      clearInterval(intID);
    }, 920);
    return random1;
  };

  useEffect(() => {
    setRollFuncs((prev) => {
      const roll = [...prev];
      roll.push(rollNum);
      return roll;
    });
  }, []);

  const rollingClass = rolling ? "animate" : "";

  return (
    <>
      {roll && (
        <img src={IMAGES[roll]} alt="die img" className={rollingClass} />
      )}
    </>
  );
}

export default Dice;
