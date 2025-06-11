const User = require("../api/models/user");
const { verifyKey } = require("../config/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const parsetToken = token.replace("Bearer ", "");
    const { id } = verifyKey(parsetToken);
    const user = await User.findById(id);

    if (user.rol === "admin") {
      return next();
    } else {
      if (user.rol === "user" && user.id === req.params.id) {
        return next();
      } else {
        return res.status(400).json({ message: "Unauthorized: User does not have admin privileges or is not deleting their own user" });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: "Unauthorized" });
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const parsetToken = token.replace("Bearer ", "");
    const { id } = verifyKey(parsetToken);
    const user = await User.findById(id);

    if (user.rol === "admin") {
      req.user = user;
      return next();
    } else {
      return res.status(400).json({ message: "Unauthorized: User is not an admin" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Unauthorized" });
  }
}

module.exports = { isAuth, isAdmin };