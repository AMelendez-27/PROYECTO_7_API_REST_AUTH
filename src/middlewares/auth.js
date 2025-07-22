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
    req.user = user; // Guardamos el usuario en la request
    return next();
  } catch (error) {
    return res.status(400).json({ message: "Unauthorized" });
  }
}

const isAdmin = (req, res, next) => {
  // Solo comprobamos el rol, el usuario ya está en req.user
  if (req.user && req.user.rol === "admin") {
    return next();
  } else {
    return res.status(400).json({ message: "Unauthorized: User is not an admin" });
  }
}

module.exports = { isAuth, isAdmin };