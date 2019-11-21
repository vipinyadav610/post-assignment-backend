import jwt from "jsonwebtoken";

let validateToken = (req, res, next) => {
  let token = req.headers["authorization"]; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.MY_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        const userDetails = await req.db.sequelize.models.users.findOne({
          attributes: ["id", "first_name", "last_name", "email"],
          where: {
            email: decoded.email
          },
          order: [["createdAt", "DESC"]]
        });
        if (userDetails) {
          req.userDetails = userDetails;
          next();
        } else {
          res.status(401).json({
            success: false,
            message: "Token is not valid"
          });
        }
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};
export default validateToken;
