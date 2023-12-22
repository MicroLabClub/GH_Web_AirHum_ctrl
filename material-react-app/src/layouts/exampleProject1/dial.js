import React from "react";
import GaugeChart from "react-gauge-chart";

const styles = {
  dial: {
    display: "inline-block",
    width: `300px`,
    height: `auto`,
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px"
  },
  title: {
    fontSize: "1em",
    color: "#000"
  }
};

const Dial = ({ id, value, title }) => {
  let percent = value / 100;

  return (
    <div style={styles.dial}>
      <GaugeChart
        id={id}
        nrOfLevels={30}
        colors={["#FFC371", "#FF5F6D"]}
        arcWidth={0.3}
        percent={percent}
        textColor={"#000000"}
        formatTextValue={(value) => value}
      />
      <div style={styles.title}>{title}</div>
    </div>
  );
};

export default Dial;
