import express from "express";
const router = express.Router();
import deviceSensor from "../../controllers/deviceAndSensor.controller";

router.post("/api/deviceSensor", deviceSensor.create);
router.get("/api/deviceSensor/:id", deviceSensor.findOne);
router.get("/api/deviceSensor", deviceSensor.findAll);
router.put("/api/deviceSensor", deviceSensor.update);
router.delete("/api/deviceSensor/:id", deviceSensor.delete);
router.delete("/api/deviceSensor", deviceSensor.deleteAll);

export default router;