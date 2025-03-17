import jwt from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication token is required",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
