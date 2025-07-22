require('dotenv').config();
const mongoose = require('mongoose');
const House = require('../../api/models/house');
const houses = require('../../data/house');

const launchSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)

    await House.collection.drop();
    console.log("Collection dropped successfully");

    await House.insertMany(houses);
    console.log("Houses seeded successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected successfully");
  }
}

launchSeed();