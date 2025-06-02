const { getCar, getCarById, postCar, updateCar, deleteCar } = require('../controllers/car');

const carsRouter = require('express').Router();
carsRouter.get('/', getCar);
carsRouter.get('/:id', getCarById);
carsRouter.post('/', postCar);
carsRouter.put('/:id', updateCar);
carsRouter.delete('/:id', deleteCar);

module.exports = carsRouter;