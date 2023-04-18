import React from "react";
import SideBar from "./SideBar";
import { Box } from "@mui/material";
import "./Graphics.css";
import { Chart } from "react-google-charts";

function Graphics() {
  const dataLine = [
    ["Months", "Sales"],
    ["November", 74],
    ["December", 95],
    ["January", 86],
    ["February", 118],
  ];

  const optionsLine = {
    legend: { position: "none" },
    backgroundColor: "white",
    isStacked: true,
    bar: { groupWidth: "90%" },
    chartArea: { width: "80%", height: "80%" },
    vAxis: {
      viewWindowMode: "explicit",
      viewWindow: {
        max: 150,
      },
    },
  };

  const dataCir = [
    ["Product", "Sale"],
    ["Gaming GeForce RTX 4080", 15],
    ["Cooler Master CMP 510 ATX", 11],
    ["500GB M2 NVME PCI 2280 HP EX900", 6],
    ["Keyboard Gamer Logitech G Prodigy series G213 Qwerty Light Rgb", 4],
    ["MICRO INTEL CORE I5 10400F", 3],
  ];

  const optionsCir = {
    title: "Most selled products",
    pieHole: 0.5,
    is3D: false,
  };

  return (
    
    <Box display="flex">
      <SideBar />
      <Box
       marginLeft="100px"
       marginRight="100px"
       marginTop="80px"
       display="grid"
       gridTemplateColumns="repeat(60, 1fr)"
       gridAutoRows="140px"
       width="1851px"
       
     >

<div className="charts">
<div className="pie">
      <Chart
        chartType="PieChart"
        width="850px"
        height="700px"
        data={dataCir}
        options={optionsCir}
      />
  </div>
  
  <div className="column">
      <Chart chartType="ColumnChart" data={dataLine} options={optionsLine}
       width="800px"
      height="450px" />
</div>

<div className="algo"> Last months sales analysis
</div>
<div className="algo2"></div>
</div>


</Box>
    </Box>
  );
}

export default Graphics;