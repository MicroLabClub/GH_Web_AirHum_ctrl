import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";


import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import MDButton from "components/MDButton";


const projectHumidity = () => {
  const [messages, setMessages] = useState({});
  const [count, setCount] = useState(4);


  console.log(messages);

  async function getMessages() {
    try {
      const requestBodyHumidity = {
        "topic": "microlab/agro/air/humidity"
      };
      const response =
          await axios.post('http://localhost:3001/api/messages/getByTopic', requestBodyHumidity);

      let result = response.data;
      console.log(result.length);

      let shortResult = result.splice(result.length - 50, result.length);

      setMessages({
        labels: shortResult.map(x=> x.message_id),
        datasets: { label: "humidity", data: shortResult.map(x=> JSON.parse(x.message).humidity) },
      });
      const resp = shortResult.map(x=> JSON.parse(x.message).humidity);
      setCount(resp[49] + "%");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMessages();
    //automatically update the chart data each 5 seconds
    const intervalId = setInterval(() => {
      getMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  },[]);

  return (
    <DashboardLayout marginLeft={274}>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="waterdropicon"
                title="Humidity"
                count={count}
                percentage={{
                  color: "error",
                  amount: "-1",
                  label: "difference",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={(e) => getMessages(e)}>
                Load Data
              </MDButton>              
            </MDBox>

            <MDBox mb={1.5}>
            <MDButton variant="gradient" color="info" fullWidth type="submit">
                Set Data
              </MDButton>              
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Statistics of humidity"
                  date="updated 4 min ago"
                  chart={messages}
                /> 
              </MDBox>
            </Grid>

          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default projectHumidity;
