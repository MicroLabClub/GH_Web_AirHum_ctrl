import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
//import "./passport.js";
//import { dbConnect } from "./mongo";
import { meRoutes, authRoutes, mapRoutes, userRoutes, sensorRoutes, deviceRoutes, missionRoutes, messageRoutes} from "./routes";
import path from "path";
import * as fs from "fs";
import cron from "node-cron";
import ReseedAction from "./mongo/ReseedAction";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

const whitelist = [process.env.APP_URL_CLIENT];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

//dbConnect();

//testing
import connection from "./models/db.js";

//app.use(cors(corsOptions));
app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get("/", function (req, res) {
  const __dirname = fs.realpathSync(".");
  res.sendFile(path.join(__dirname, "/src/landing/index.html"));
});

app.use("/", authRoutes);
app.use("/me", meRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/messages', messageRoutes);


if (process.env.SCHEDULE_HOUR) {
  cron.schedule(`0 */${process.env.SCHEDULE_HOUR} * * *'`, () => {
    ReseedAction();
  });
}

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
