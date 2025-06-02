const House = require('../models/house');

const getHouses = async (req, res, next) => {
  try {
    const houses = await House.find().populate('neighborhood');
    return res.status(200).json(houses);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const getHouseById = async  (req, res, next) => {
  try {
    const { id } = req.params;
    const house = await House.findById(id).populate('neighborhood');
    return res.status(200).json(house);
    } catch (error) {
      return res.status(400).json("error");
    }
};

const postHouse = async (req, res, next) => {
  try {
    const newHouse = new House(req.body);
    const existingHouse = await House.findOne({ address: newHouse.address, neighborhood: newHouse.neighborhood });
    
    if (existingHouse) {
      return res.status(400).json("House already exists");
    }

    const houseSaved = await newHouse.save();
    return res.status(201).json(houseSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateHouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const houseUpdated = await House.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(houseUpdated);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteHouse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const houseDeleted = await House.findByIdAndDelete(id);
    return res.status(200).json({
      message: "House deleted successfully",
      house: houseDeleted
    });
  } catch (error) {
    return res.status(400).json("error");
  }
};

module.exports = {
  getHouses,
  getHouseById,
  postHouse,
  updateHouse,
  deleteHouse
};