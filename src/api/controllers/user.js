const { generateKey } = require('../../config/jwt');
const houses = require('../../data/house');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      houses: req.body.houses,
      rol: "user"
    });
    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const userSaved = await newUser.save();
    
    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json("error");
    
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const loginPassword = req.body.password;
      const comparePasswords = bcrypt.compareSync(loginPassword, user.password);
      if (comparePasswords) {
        const token = generateKey(user._id);
        return res.status(200).json({user, token});
      } else {
        return res.status(400).json("Incorrect email or password");
      }
    } 
    return res.status(400).json("Incorrect email or password");
  } catch (error) {
    return res.status(400).json(error);
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json("User not found");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const postUser = async (req, res, next) => {
  try {
    // Forzar el rol a 'user' al crear el usuario
    const newUser = new User({
      ...req.body,
      rol: "user"
    });
    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const userSaved = await newUser.save();
    
    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json("error");
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldUser = await User.findById(id);

    if (oldUser.rol === "admin") {
      return res.status(400).json("You cannot update an admin user");
    }

    const update = req.body;
    const userUpdated = await User.findByIdAndUpdate(id, update, { new: true });
    return res.status(200).json(userUpdated);
    
  } catch (error) {
    return res.status(400).json("error");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    // req.user debe estar seteado por el middleware isAuth
    const requester = req.user;
    if (!requester) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Si el que hace la petición es admin
    if (requester.rol === "admin") {
      // Admin no puede eliminar a otro admin (pero sí a sí mismo)
      if (userToDelete.rol === "admin" && requester.id !== userToDelete.id) {
        return res.status(403).json({ message: "Admins cannot delete other admins" });
      }
      // Puede eliminarse a sí mismo o a cualquier user
    } else {
      // Si no es admin, solo puede eliminarse a sí mismo
      if (requester.id !== userToDelete.id) {
        return res.status(403).json({ message: "You can only delete your own user" });
      }
    }
    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "User deleted successfully",
      user: userDeleted
    });
  } catch (error) {
    return res.status(400).json("error");
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser
};