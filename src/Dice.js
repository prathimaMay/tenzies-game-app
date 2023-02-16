import React from "react";

export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="die-face" style={styles} onClick={props.clickDice}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
