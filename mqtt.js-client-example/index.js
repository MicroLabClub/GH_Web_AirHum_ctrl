/*
 * Copyright 2021 HiveMQ GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import mqtt from 'mqtt';
import mysql from "mysql2"


// your credentials
const options = {
  username: 'sergiu.doncila',
  password: 'QWEasd!@#123',
  host: '9b7b323ee67e46d18f9317162c8e8841.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
};

// connect to your cluster
let client = mqtt.connect(options);

client.on('connect', mqtt_connected);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('close', mqtt_close);
client.on('message', mqtt_messsageReceived);

//receive a message from MQTT broker
function mqtt_messsageReceived(topic, message, packet) {
  console.log('Received message on topic:', topic); 
  var message_str = message.toString(); //convert byte array to string
  console.log("message to string", message_str);
  let table_name = "messages_mqqt";
  try {
    insert_message(topic, message, table_name);
  } catch(e){
    console.log("Error on sql insert message : ", e.message);
  }
  
};

//insert a row into the db table
function insert_message(topic, message, table_name) {
  let jsonMessage = JSON.parse(message); 
  let sensor_id = jsonMessage.sensor_id;
  let date= new Date();
  let sql = "INSERT INTO ?? (??,??,??,??,??) VALUES (?,?,?,?,?)";
  let params = [table_name, 'message_id', 'sensor_id', 'topic', 'message','date', null, sensor_id, topic, message, date];
  sql = mysql.format(sql, params);    

  connection.query(sql, function (error, results) {
      if (error) throw error;
      console.log("Message added: " , results.insertId);
  }); 
};  


function mqtt_connected(){
  console.log("Connected to MQTT");
};

function mqtt_reconnect(err) {
  console.log("Reconnect MQTT");
  if (err) {console.log(err);}
  client  = mqtt.connect(options);
};

function mqtt_close() {
  console.log("Close MQTT");
};

function mqtt_error(err) {
  console.log("MQTT Error:",err);
};

function mqtt_subscribe(err, Topic) {
  console.log("Subscribed to " + JSON.stringify(Topic));
  if (err) {console.log(err);}
};


// subscribe and publish to the same topic
// client.subscribe('agrobot/sensors/#', mqtt_subscribe);
client.subscribe('microlab/agro/air/humidity', mqtt_subscribe);

// uncomment if you want to mock the sensor ( to send data)
//
// setInterval(function () {
//   let tc = Math.floor((Math.random() * 100) + 1);
//   client.publish('microlab/agro/air/humidity', JSON.stringify({'humidity': tc, 'sensor_id':1}));
// }, 6000);

// setInterval(function () {
//   let tc = Math.floor((Math.random() * 10) + 1);
//   client.publish('agrobot/sensors/temperature/sensor-2', JSON.stringify({'hum': tc, 'sensor_id':2}));
// }, 6000);


//testing
import connection from "./db.js";
