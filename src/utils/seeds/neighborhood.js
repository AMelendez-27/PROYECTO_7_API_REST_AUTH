require('dotenv').config();
const mongoose = require('mongoose');
const Neighborhood = require('../../api/models/neighborhood');
const neighborhoods = require('../../data/neighborhood');

const launchSeed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    await Neighborhood.collection.drop();
    console.log("Colección eliminada con éxito");
    await Neighborhood.insertMany(neighborhoods);
    console.log("Barrios sembrados con éxito");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("Base de datos desconectada con éxito");
  }
}

launchSeed();