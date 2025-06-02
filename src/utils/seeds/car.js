const mongoose = require('mongoose');
const Car = require('../../api/models/car');
const cars = require('../../data/cars');

const launchSeed = async () => {
  try {
    await mongoose.connect("mongodb+srv://ddbb_admin:admin!!@cluster0.blao9rd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

    await Car.collection.drop();
    console.log("Collection dropped successfully");

    await Car.insertMany(cars);
    console.log("Cars seeded successfully");

    await mongoose.disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error(error);
  }
  
}

launchSeed();