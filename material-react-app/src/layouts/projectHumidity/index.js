import React, {useEffect, useState, useReducer} from "react";
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

import mqtt from "mqtt";
import {host, options} from "../../config/mqtt.config";
import MDTypography from "components/MDTypography";
import {defined} from "chart.js/helpers";

const projectHumidity = () => {

    const [messages, setMessages] = useState({});
    const [count, setCount] = useState(4);

    async function getMessages() {
        try {
            const requestBodyHumidity = {
                "topic": "microlab/agro/green_house/air_hum_ctrl"
            };
            const response = await axios.post('http://localhost:3001/api/messages/getByTopic', requestBodyHumidity);
            let result = response.data;
            console.log(result.length);

            let shortResult = result.slice(-50);

            setMessages({
                labels: shortResult.map(x=> x.message_id),
                datasets:
                    {
                        label: "cur_hum",
                        data: shortResult.map(x => JSON.parse(x.message).cur_hum),
                    }
            });

            const resp = shortResult.map(x=> JSON.parse(x.message).cur_hum);
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


    /*   Set Data */
    //const [settings, setSettings] = useState(null);
    const [settingsTempTime, setSettingsTempTime] = useState(60);
    const [setPoint, setPointSettings] = useState(60);

    function setMqttData() {
        try {
            let publishSettings = JSON.stringify({ 'set_point': settingsTempTime });
            console.log(publishSettings);

            let result = client.publish('microlab/agro/green_house/air_hum_ctrl/set', publishSettings);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    const changeTempSettingsHandler = (e) => {
        setSettingsTempTime(e.target.value);
        setPointSettings(e.target.value);


    };

    /* MQTT */
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState(null);

    const [temperature, setTemp] = useState(0);

    const tempTopic = 'microlab/agro/green_house/air_hum_ctrl/set';


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
                    setTemp(JSON.parse(message.toString()).temperature);
                }
                console.log(message.toString());
            });
        }
    }, [client]);

    const handleSetDataClick = () => {

        try {
            const payload = {
                cmd: "ctrl_mode",
                value: "1",
            };

            const topic = "microlab/agro/green_house/air_hum_ctrl/set";

            if (client) {

                client.publish(topic, JSON.stringify(payload), (err) => {
                    if (err) {
                        console.error("Failed to publish message:", err);
                    } else {
                        console.log("Message published successfully");
                    }
                });
            } else {
                console.error("MQTT client not connected");
            }
        } catch (error) {

            console.error(error);
        }
    };

    const handleManualClick = () => {
        setIsManualExpanded(!isManualExpanded);
        try {
            const payload = {
                cmd: "ctrl_mode",
                value: "0",
            };

            const topic = "microlab/agro/green_house/air_hum_ctrl/set";

            if (client) {

                client.publish(topic, JSON.stringify(payload), (err) => {
                    if (err) {
                        console.error("Failed to publish message:", err);
                    } else {
                        console.log("Message published successfully");
                    }
                });
            } else {
                console.error("MQTT client not connected");
            }
        } catch (error) {

            console.error(error);
        }
    };
    const handleSetPointClick = () => {

        try {
            const payload = {
                cmd: "set_point",
                value: String(parseFloat(setPoint)),
            };

            const topic = "microlab/agro/green_house/air_hum_ctrl/set";

            if (client) {

                client.publish(topic, JSON.stringify(payload), (err) => {
                    if (err) {
                        console.error("Failed to publish message:", err);
                    } else {
                        console.log("Message published successfully");
                    }
                });
            } else {
                console.error("MQTT client not connected");
            }
        } catch (error) {

            console.error(error);
        }
    };
    const handleOpenClick = () => {

        try {
            const payload = {
                cmd: "ctrl_out",
                value: "1",
            };

            const topic = "microlab/agro/green_house/air_hum_ctrl/set";

            if (client) {

                client.publish(topic, JSON.stringify(payload), (err) => {
                    if (err) {
                        console.error("Failed to publish message:", err);
                    } else {
                        console.log("Message published successfully");
                    }
                });
            } else {
                console.error("MQTT client not connected");
            }
        } catch (error) {

            console.error(error);
        }
    };

    const handleClosedClick = () => {

        try {
            const payload = {
                cmd: "ctrl_out",
                value: "0",
            };

            const topic = "microlab/agro/green_house/air_hum_ctrl/set";

            if (client) {

                client.publish(topic, JSON.stringify(payload), (err) => {
                    if (err) {
                        console.error("Failed to publish message:", err);
                    } else {
                        console.log("Message published successfully");
                    }
                });
            } else {
                console.error("MQTT client not connected");
            }
        } catch (error) {

            console.error(error);
        }
    };

    const [isManualExpanded, setIsManualExpanded] = useState(false);
    const handleAutomatClick = () => {
        setIsManualExpanded(false); // Hide manual buttons and show "Manual" button

        if (!isManualExpanded) {
            handleSetDataClick(); // Call handleSetDataClick only if Manual was expanded
        }
    };
    return (
        <DashboardLayout marginLeft={274}>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3} style={{ margin: '0 auto', maxWidth: '100%'}}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                icon="waterdropicon"
                                title="Humidity"
                                count={count}
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
                            <MDButton variant="gradient" color="info" fullWidth type="submit" onClick={(e) => setMqttData(e)}
                                      onClick={handleSetPointClick}>
                                Set Point
                            </MDButton>
                        </MDBox>

                        <MDBox mb={1.5}>
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Set Point"
                                    fullWidth
                                    value={settingsTempTime}
                                    name="settingsTempTime"
                                    onChange={changeTempSettingsHandler}
                                />
                            </MDBox>

                        </MDBox>

                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <MDTypography > MQTT status : {connectStatus}</MDTypography>
                        </MDBox>
                        <MDBox mb={1.5}>
                            <MDTypography > Current Settings :</MDTypography>
                            <MDTypography > Set Point : {settingsTempTime}</MDTypography>
                        </MDBox>

                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5} alignItems="flex-end" justifyContent="right">
                            <MDButton
                                variant="gradient"
                                color="info"
                                // style={{ fontSize: 26 }}
                                onClick={handleAutomatClick}
                            >
                                Automat
                            </MDButton>
                        </MDBox>

                        <MDBox mb={1.5} alignItems="flex-end" justifyContent="right">
                            {isManualExpanded ? (
                                <>
                                    <MDButton variant="gradient" color="info" onClick={handleOpenClick} style={{ marginRight: '8px' }}>
                                        On
                                    </MDButton>
                                    <MDButton variant="gradient" color="info" onClick={handleClosedClick} style={{ marginRight: '8px' }}>
                                        Off
                                    </MDButton>
                                </>
                            ) : (
                                <MDButton
                                    variant="gradient"
                                    color="info"
                                    // style={{ fontSize: 30 }}
                                    onClick={handleManualClick}
                                >
                                    Manual
                                </MDButton>
                            )}
                        </MDBox>

                    </Grid>

                </Grid>

                <MDBox mt={4.5}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={12} lg={12}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="Humidity Chart"
                                    chart={messages}
                                    date={"just updated"}
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
