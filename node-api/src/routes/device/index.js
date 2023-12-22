import express from "express";
const router = express.Router();
import devices from "../../controllers/device.controller.js";

router.post("/", devices.create);
router.get("/:id", devices.findOne);
router.get("/", devices.findAll);
router.put("/", devices.update);
router.delete("/:id", devices.delete);
router.delete("/", devices.deleteAll);

export default router;