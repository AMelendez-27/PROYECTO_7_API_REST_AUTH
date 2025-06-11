const { isAuth, isAdmin } = require('../../middlewares/auth');
const { register, login, getUsers, getUserById, postUser, updateUser, deleteUser } = require('../controllers/user');

const usersRouter = require('express').Router();
usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', postUser);
usersRouter.put('/:id', [isAdmin], updateUser);
usersRouter.delete('/:id', [isAuth], deleteUser);

module.exports = usersRouter;