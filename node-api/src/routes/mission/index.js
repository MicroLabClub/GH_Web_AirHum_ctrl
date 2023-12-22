import express from "express";
const router = express.Router();
import missions from "../../controllers/mission.controller.js";

router.post("/", missions.create);
router.get("/:id", missions.findOne);
router.get("/", missions.findAll);
router.put("/", missions.update);
router.delete("/:id", missions.delete);
router.delete("/", missions.deleteAll);

export default router;