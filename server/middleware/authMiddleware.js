import jwt from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    try {
      const token = req.header('Authorization')
      const decode = jwt.verify(token, "secretKey");
      req.user = decode;
      next();
    } catch (error) {
      console.log(error.message);
      res.status(404).json({
        message: error.message,
      })
    }

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
}
