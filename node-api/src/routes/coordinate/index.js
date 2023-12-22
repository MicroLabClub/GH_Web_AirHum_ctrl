import express from "express";
const router = express.Router();
import coordinates from "../../controllers/coordinate.controller.js";

router.post("/api/coordinates", coordinates.create);
router.get("/api/coordinates/:id", coordinates.findOne);
router.get("/api/coordinates", coordinates.findAll);
router.put("/api/coordinates", coordinates.update);
router.delete("/api/coordinates/:id", coordinates.delete);
router.delete("/api/coordinates", coordinates.deleteAll);

export default router;