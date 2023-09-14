#! /usr/bin/env node

console.log(
  'This script populates some test plants, categories, and care instructions to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/plant_inventory?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Plant = require("./models/plant");
const Category = require("./models/category");
const CareInstruction = require("./models/careInstruction");

const categories = [];
const plants = [];
const careInstructions = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createPlants();
  await createCareInstructions();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function plantCreate(
  index,
  name,
  scientificName,
  description,
  category,
  price,
  numberInStock,
  image,
  url
) {
  const plantDetail = {
    name: name,
    scientificName: scientificName,
    description: description,
    category: category,
    price: price,
    numberInStock: numberInStock,
    image: image,
    url: url,
  };

  const plant = new Plant(plantDetail);
  await plant.save();
  plants[index] = plant;
  console.log(`Added plant: ${name}`);
}

async function careInstructionCreate(index, plant, light, water, temperature) {
  const careInstructionDetail = {
    plant: plant,
    light: light,
    water: water,
    temperature: temperature,
  };

  const careInstruction = new CareInstruction(careInstructionDetail);
  await careInstruction.save();
  careInstructions[index] = careInstruction;
  console.log(`Added care instruction for: ${plant.name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Succulents", "Drought resistant plants."),
    categoryCreate(
      1,
      "Ornamentals",
      "Decorative plants primarily for aesthetics."
    ),
    categoryCreate(2, "Herbs", "Medicinal and culinary plants."),
  ]);
}

async function createPlants() {
  console.log("Adding Plants");
  await Promise.all([
    plantCreate(
      0,
      "Aloe Vera",
      "Aloe barbadensis miller",
      "A plant species of the genus Aloe.",
      categories[0],
      5.99,
      20,
      "image/path/here.jpg",
      "/plants/aloe-vera"
    ),
    plantCreate(
      1,
      "Lavender",
      "Lavandula",
      "A genus of 47 known species of flowering plants.",
      categories[2],
      3.99,
      50,
      "image/path/here.jpg",
      "/plants/lavender"
    ),
    plantCreate(
      2,
      "Fern",
      "Polypodiopsida",
      "Member of a group of vascular plants that reproduce via spores.",
      categories[1],
      8.99,
      30,
      "image/path/here.jpg",
      "/plants/fern"
    ),
  ]);
}

async function createCareInstructions() {
  console.log("Adding Care Instructions");
  await Promise.all([
    careInstructionCreate(
      0,
      plants[0],
      "Indirect light",
      "Moderate",
      "15-25°C"
    ),
    careInstructionCreate(1, plants[1], "Direct light", "Low", "10-18°C"),
    careInstructionCreate(2, plants[2], "Shade", "High", "12-22°C"),
  ]);
}
