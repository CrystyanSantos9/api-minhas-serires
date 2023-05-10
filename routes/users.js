const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
// const jwtSecret = process.env.JWT_SECRET || "vegetaABC123";
const yup = require("yup");

const User = require("../models/user");
const auth = require("./auth");
const UserController = require("../controllers/users");

const models = {
  User,
};

// router.use(auth);

router.get("/", auth, UserController.list.bind(null, models));
router.get("/:id", auth, UserController.findById.bind(null, models));
router.post("/", UserController.create.bind(null, models));
router.put("/:id", UserController.update.bind(null, models));

// //será a rota principal do recurso /series
// //que vamos definir dentro do módulo server
// router.get("/", async (req, res) => {
//   const users = await User.find({});
//   res.send(users);
// });

// router.post("/", async (req, res) => {
//   const userSchema = yup.object().shape({
//     username: yup.string().required().min(6),
//     password: yup.string().required().strict(true),
//   });

//   if (!(await userSchema.isValid(req.body))) {
//     return res.status(400).json({ error: "Error on validate schema" });
//   }

//   const user = new User(req.body);
//   try {
//     await user.save();
//     res.send(user);
//   } catch (e) {
//     res.send({
//       success: false,
//       errors: Object.keys(e.errors),
//     });
//   }
// });

module.exports = router;
