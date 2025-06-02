const { getHouses, getHouseById, postHouse, updateHouse, deleteHouse } = require('../controllers/house');

const housesRouter = require('express').Router();
housesRouter.get('/', getHouses);
housesRouter.get('/:id', getHouseById);
housesRouter.post('/', postHouse);
housesRouter.put('/:id', updateHouse);
housesRouter.delete('/:id', deleteHouse);

module.exports = housesRouter;