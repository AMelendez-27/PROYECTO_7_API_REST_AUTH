const cars = require('../../data/cars');
const CarDealership = require('../models/carDealership');

const getCarDealerships = async (req, res, next) => {
  try {
    const carDealerships = await CarDealership.find().populate('cars');
    return res.status(200).json(carDealerships);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const getCarDealership = async  (req, res, next) => {
  try {
    const { id } = req.params;
    const carDealership = await CarDealership.findById(id).populate('cars');
    return res.status(200).json(carDealership);
    } catch (error) {
      return res.status(400).json("error");
    }
};

const postCarDealership = async (req, res, next) => {
  try {
    const newCarDealership = new CarDealership(req.body);
    const existingCarDealership = await CarDealership.findOne({ name: newCarDealership.name, location: newCarDealership.location, size: newCarDealership.size });
    
    if (existingCarDealership) {
      return res.status(400).json("Dealership already exists");
    }

    const carDealershipSaved = await newCarDealership.save();
    return res.status(201).json(carDealershipSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateCarDealership = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldCarDealership = await CarDealership.findById(id);
    const newCarDealership = new CarDealership(req.body);

    for (car of newCarDealership.cars) {
      if (oldCarDealership.cars.includes(car)) {
        return res.status(400).json("CarDealership already has these cars");
      }
    }

    newCarDealership._id = id;
    newCarDealership.cars = [...oldCarDealership.cars, ...req.body.cars];

    const carDealershipUpdated = await CarDealership.findByIdAndUpdate(id, newCarDealership, { new: true })
    return res.status(200).json(carDealershipUpdated);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteCarDealership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carDealershipDeleted = await CarDealership.findByIdAndDelete(id);
    return res.status(200).json({
      message: "CarDealership deleted successfully",
      carDealership: carDealershipDeleted
    });
  } catch (error) {
    return res.status(400).json("error");
  }
};

module.exports = {
  getCarDealerships,
  getCarDealership,
  postCarDealership,
  updateCarDealership,
  deleteCarDealership
};