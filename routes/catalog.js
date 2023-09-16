const express = require("express");
const router = express.Router();

const plant_controller = require("../controllers/plantController");

router.get("/", plant_controller.index);

router.get("/plants", plant_controller.plant_list);

router.get("/plants/:id", plant_controller.plant_detail);

module.exports = router;