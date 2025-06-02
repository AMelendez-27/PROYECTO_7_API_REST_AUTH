const mongoose = require('mongoose');
const CarDealership = require('../../api/models/carDealership');
const carDealerships = require('../../data/carDealerships');

const launchSeed = async () => {
  try {
    await mongoose.connect("mongodb+srv://ddbb_admin:admin!!@cluster0.blao9rd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

    await CarDealership.collection.drop();
    console.log("Collection dropped successfully");

    await CarDealership.insertMany(carDealerships);
    console.log("Cars seeded successfully");

    await mongoose.disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error(error);
  }
  
}

launchSeed();