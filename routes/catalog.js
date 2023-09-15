const express = require("express");
const router = express.Router();

const plant_controller = require("../controllers/plantController");

router.get("/", plant_controller.index);

router.get("/plants", plant_controller.plant_list);

module.exports = router;