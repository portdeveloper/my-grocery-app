const Plant = require("../models/plant.js");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async function (req, res, next) {
  const plants = await Plant.find();
  res.render("index", { plants: plants });
});

exports.plant_list = asyncHandler(async function (req, res, next) {
  const plants = await Plant.find();
  res.render("plants_list", { plants: plants });
});

exports.plant_detail = asyncHandler(async function (req, res, next) {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return next();
    res.render("plant_detail", { plant: plant });
  } catch (error) {
    console.error("Error fetching plant:", error);
    next(error);
  }
});
