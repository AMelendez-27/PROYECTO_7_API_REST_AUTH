const { getCarDealerships, getCarDealership,  postCarDealership, updateCarDealership, deleteCarDealership } = require('../controllers/carDealership');

const carDealershipsRouter = require('express').Router();
carDealershipsRouter.get('/', getCarDealerships);
carDealershipsRouter.get('/:id', getCarDealership);
carDealershipsRouter.post('/', postCarDealership);
carDealershipsRouter.put('/:id', updateCarDealership);
carDealershipsRouter.delete('/:id', deleteCarDealership);

module.exports = carDealershipsRouter;