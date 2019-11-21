import jwt from "jsonwebtoken";
import { passwordHash, comparePassword } from "../utils/encryption";

/**
 * @swagger
 * /api/v1/signup:
 *   post:
 *     tags:
 *       - Users
 *     description: signup user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: request body
 *         description: user details
 *         schema:
 *          type: object
 *          properties:
 *            first_name:
 *              type: string
 *            last_name:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       200:
 *         description: success response
 *       400:
 *         description: operation failed
 *       500:
 *         description: database error
 */

const signup = async (req, res) => {
  try {
    req.body.email = req.body.email.toLowerCase();
    req.body.password = await passwordHash(req.body.password);

    const { email } = await req.db.sequelize.models.users.create(req.body);
    const token = jwt.sign(
      {
        email
      },
      process.env.MY_SECRET
    );
    res.status(200).json({
      success: true,
      token
    });
  } catch (e) {
    console.log("sign up error", e);
    const message =
      e.errors && e.errors[0].message === "email must be unique"
        ? "Email already exist"
        : "Something went wrong";
    res.status(400).json({
      success: false,
      message
    });
  }
};

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Users
 *     description: login user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: request body
 *         description: user email and password
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       200:
 *         description: success response
 *       400:
 *         description: operation failed
 *       500:
 *         description: database error
 */
const login = async (req, res) => {
  let user = await req.db.sequelize.models.users.findOne({
    attributes: ["email", "password"],
    where: {
      email: req.body.email
    },
    order: [["createdAt", "DESC"]]
  });
  if (user) {
    const match = await comparePassword(req.body.password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          email: user.email
        },
        process.env.MY_SECRET
      );
      res.status(200).json({
        success: true,
        token
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid password"
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Email doesn't exist"
    });
  }
};

export default {
  signup,
  login
};
