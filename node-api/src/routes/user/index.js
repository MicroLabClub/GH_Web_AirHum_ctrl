import express from "express";
const router = express.Router();
import users from "../../controllers/user.controller.js";

router.post("/", users.create);
router.get("/:id", users.findOne);
router.get("/", users.findAll);
router.put("/", users.update);
router.delete("/:id", users.delete);
router.delete("/", users.deleteAll);

export default router;