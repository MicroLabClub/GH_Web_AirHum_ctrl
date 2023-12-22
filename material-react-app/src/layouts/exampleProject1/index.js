import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";


import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDInput from "components/MDInput";


import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import MDButton from "components/MDButton";

import Temp from "./temp";
import Battery from "./battery";
import Dial from "./dial";
import AccelDial from "./accelDial";

import mqtt from "mqtt";
import { options } from "../../config/mqtt.config";
import { host } from "../../config/mqtt.config";
import MDTypography from "components/MDTypography";


const exampleProject1 = () => {


  const [messages, setMessages] = useState([]);

  //  console.log(messages);

  async function getMessages() {
    try {
      const response = await axios.post('http://localhost:3001/api/messages/getBySensorId', { "sensor_id": 1 });
      let result = response.data;
      console.log(result.length);

      let shortResult = result.splice(result.length - 50, result.length);

      setMessages({
        labels: shortResult.map(x => x.message_id), // ce scrie dedesubt data sau ora de exemplu
        datasets: { label: "Temperature", data: shortResult.map(x => JSON.parse(x.message).temp) },
      });

      console.log(messages);
    } catch (error) {
      console.error(error);
    }
  }
  // bind la evenimente la componente
  useEffect(() => {
    getMessages();
  }, []);

  /*   Set Data */
  const [settings, setSettings] = useState(null);

  const changeHandler = (e) => {
    setSettings(e.target.value);
  };



  /* MQTT */
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState(null);

  const [temp, setTemp] = useState(0);
  const [hum, setHum] = useState(0);




  const tempTopic = 'agrobot/sensors/temperature/sensor-1';
  const humTopic = 'agrobot/sensors/temperature/sensor-2';


  const mqttConnect = () => {
    setConnectStatus('Connecting');
    let client = mqtt.connect(host, options);
    setClient(client);
  };

  useEffect(() => {
    mqttConnect();
  }, []);

  useEffect(() => {
    if (client) {
      console.log(client);
      client.on('connect', () => {
        setConnectStatus('Connected');

        client.subscribe(tempTopic);
        client.subscribe(humTopic);
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic, message) => {
        setConnectStatus('Message received');

        if (topic === tempTopic) {
          setTemp(JSON.parse(message.toString()).temp);
        } else if (topic === humTopic) {
          setHum(JSON.parse(message.toString()).hum);
        }
        console.log(message.toString());
      });
    }
  }, [client]);


  return (
    <DashboardLayout marginLeft={274}>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="thermostat"
                title="Temperature"
                count={temp}
                percentage={{
                  color: "success",
                  amount: "+1",
                  label: "difference",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="waterdropicon"
                title="Humidity"
                count={hum}
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

            <MDBox mb={1.5}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Settings"
                  fullWidth
                  value={settings}
                  name="settings"
                  onChange={changeHandler}
                />
              </MDBox>

            </MDBox>

          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <MDTypography > MQTT status : {connectStatus}</MDTypography>
            </MDBox>
            <MDBox mb={1.5}>
              <MDTypography > Current Settings : {settings}</MDTypography>
            </MDBox>

          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>

            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Statistics"
                  description={
                    <>
                      (<strong>+25</strong>) hot weather today.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={messages}
                />
              </MDBox>
            </Grid>

          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Temp id={"temp1"} value={temp} title={"temperature"}></Temp>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Battery percentage={temp} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Dial id="dial2" value={temp} title="Speed Y" />

            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AccelDial id="dial3" value={hum} title="Acceleration X" />
            </Grid>
          </Grid>
        </MDBox>




      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default exampleProject1;
