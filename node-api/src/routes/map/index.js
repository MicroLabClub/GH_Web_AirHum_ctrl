import express from "express";
const router = express.Router();
import maps from "../../controllers/map.controller.js";

router.post("/", maps.create);
router.get("/:id", maps.findOne);
router.get("/", maps.findAll);
router.put("/", maps.update);
router.delete("/:id", maps.delete);
router.delete("/", maps.deleteAll);

export default router;

/*
module.exports = app => {
    const maps = require("../controllers/map.controller.js");
    var router = require("express").Router();

    router.post("/", maps.create);
    router.get("/:id", maps.findOne);
    router.get("/", maps.findAll);
    router.put("/", maps.update);
    router.delete("/:id", maps.delete);
    router.delete("/", maps.delelteAll);

    app.use('api/maps', router);
};
*/
