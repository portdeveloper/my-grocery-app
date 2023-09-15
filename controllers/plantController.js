const plant = require("../models/plant.js");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async function (req, res, next) {
  const plants = await plant.find();
  res.render("index", { plants: plants });
});

exports.plant_list = asyncHandler(async function (req, res, next) {
  const plants = await plant.find();
  res.render("plants_list", { plants: plants });
});
