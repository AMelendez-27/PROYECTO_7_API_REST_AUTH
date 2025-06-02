const Neighborhood = require('../models/neighborhood');

const getNeighborhoods = async (req, res, next) => {
  try {
    const neighborhoods = await Neighborhood.find().populate('houses');
    return res.status(200).json(neighborhoods);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const getNeighborhoodById = async  (req, res, next) => {
  try {
    const { id } = req.params;
    const neighborhood = await Neighborhood.findById(id).populate('houses');
    return res.status(200).json(neighborhood);
    } catch (error) {
      return res.status(400).json("error");
    }
};

const postNeighborhood = async (req, res, next) => {
  try {
    const newNeighborhood = new Neighborhood(req.body);
    const existingNeighborhood = await Neighborhood.findOne({ name: newNeighborhood.name, location: newNeighborhood.location, size: newNeighborhood.size });
    
    if (existingNeighborhood) {
      return res.status(400).json("Neighborhood already exists");
    }

    const neighborhoodSaved = await newNeighborhood.save();
    return res.status(201).json(neighborhoodSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateNeighborhood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldNeighborhood = await Neighborhood.findById(id);
    const newNeighborhood = new Neighborhood(req.body);

    for (house of newNeighborhood.houses) {
      if (oldNeighborhood.houses.includes(house)) {
        return res.status(400).json("Neighborhood already has these houses");
      }
    }

    newNeighborhood._id = id;
    newNeighborhood.houses = [...oldNeighborhood.houses, ...req.body.houses];

    const neighborhoodUpdated = await Neighborhood.findByIdAndUpdate(id, newNeighborhood, { new: true })
    return res.status(200).json(neighborhoodUpdated);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteNeighborhood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const neighborhoodDeleted = await Neighborhood.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Neighborhood deleted successfully",
      neighborhood: neighborhoodDeleted
    });
  } catch (error) {
    return res.status(400).json("error");
  }
};

module.exports = {
  getNeighborhoods,
  getNeighborhoodById,
  postNeighborhood,
  updateNeighborhood,
  deleteNeighborhood
};