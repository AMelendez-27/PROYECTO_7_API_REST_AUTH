const { getNeighborhoods, getNeighborhoodById, postNeighborhood, updateNeighborhood, deleteNeighborhood } = require('../controllers/neighborhood');

const neighborhoodsRouter = require('express').Router();
neighborhoodsRouter.get('/', getNeighborhoods);
neighborhoodsRouter.get('/:id', getNeighborhoodById);
neighborhoodsRouter.post('/', postNeighborhood);
neighborhoodsRouter.put('/:id', updateNeighborhood);
neighborhoodsRouter.delete('/:id', deleteNeighborhood);

module.exports = neighborhoodsRouter;