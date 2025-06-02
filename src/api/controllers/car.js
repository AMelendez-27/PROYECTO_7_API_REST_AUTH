const Car = require('../models/car');

const getCar = async (req, res, next) => {
  try {
    const cars = await Car.find();
    return res.status(200).json(cars);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) return res.status(404).json("Car not found");
    return res.status(200).json(car);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const postCar = async (req, res, next) => {
  try {
    const newCar = new Car(req.body);
    const existingCar = await Car.findOne({ brand: newCar.brand, model: newCar.model });

    if (existingCar) {
      return res.status(400).json("Car already exists");
    }

    const carSaved = await newCar.save();
    
    return res.status(201).json(carSaved);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newCar = new Car(req.body);
    newCar._id = id;

    const carUpdated = await Car.findByIdAndUpdate(id, newCar, { new: true })
    return res.status(200).json(carUpdated);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carDeleted = await Car.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Car deleted successfully",
      car: carDeleted
    });
  } catch (error) {
    return res.status(400).json("error");
  }
};

module.exports = {
  getCar,
  getCarById,
  postCar,
  updateCar,
  deleteCar
};