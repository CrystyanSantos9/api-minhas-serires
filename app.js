const express = require("express");
const app = express();

const User = require("./models/user");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "vegetaABC123";
const yup = require("yup");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//ROTAS
const series = require("./routes/series");
const users = require("./routes/users");
const counts = require("./routes/counts");

//USANDO ROTAS
app.use("/series", series);
app.use("/users", users);
app.use("/counts", counts);

app.post("/auth", async (req, res) => {
  const userSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required().strict(true),
  });

  if (!(await userSchema.isValid(req.body))) {
    return res.status(400).json({ error: "Error on validate schema" });
  }

  const user = req.body;

  const IsUserIndDB = await User.findOne({ username: user.username });

  if (IsUserIndDB) {
    const isValid = await IsUserIndDB.checkPassword(user.password);
    if (isValid) {
      console.log(user.password);
      console.log(IsUserIndDB.password);
      const payload = {
        userId: IsUserIndDB._id,
        username: IsUserIndDB.name,
        roles: IsUserIndDB.roles,
      };
      await jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: "3600s" },
        (err, token) => {
          return res.send({
            username: IsUserIndDB.username,
            success: true,
            token: token,
          });
        }
      );
    } else {
      res.statusCode = 400;
      res.send({
        success: false,
        message: "wrong credentials, try again later...",
      });
    }
  } else {
    res.statusCode = 400;
    res.send({
      success: false,
      message: "wrong credentials, try again later...",
    });
  }
});

module.exports = app;
