import express from "express";
const router = express.Router();
import sensors from "../../controllers/sensor.controller.js";

router.post("/", sensors.create);
router.get("/:id", sensors.findOne);
router.get("/", sensors.findAll);
router.put("/", sensors.update);
router.delete("/:id", sensors.delete);
router.delete("/", sensors.deleteAll);

export default router;