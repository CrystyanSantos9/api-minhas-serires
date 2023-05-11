//chama o objeto de criaçaõ do servidor
// const express = require("express");
// const app = express();
const app = require("./app");
const { default: mongoose } = require("mongoose");
// const jwt = require("jsonwebtoken");
// const jwtSecret = process.env.JWT_SECRET || "vegetaABC123";
// const yup = require("yup");

// const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./swagger_output.json");

// const cors = require("cors");

//Model
const User = require("./models/user");

//em versõs mais antigas
//mongoose.Promise = global.Promise

//variaveis de ambiente porta e endereço servidor
const PORT = process.env.PORT || 3005;
const HOST = process.env.HOST || "0.0.0.0";
//definindo url do mongo
// const mongo = process.env.MONGO || 'mongodb://localhost/api-minhas-series'
const mongo = process.env.MONGO || "mongodb://192.168.1.110/api-minhas-series";

//middlewares
//identificar formato de entrada de dados
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// //ROTAS
// const series = require("./routes/series");
// const users = require("./routes/users");
// const counts = require("./routes/counts");

// //USANDO ROTAS
// app.use("/series", series);
// app.use("/users", users);
// app.use("/counts", counts);

// app.post("/auth", async (req, res) => {
//   const userSchema = yup.object().shape({
//     username: yup.string().required(),
//     password: yup.string().required().strict(true),
//   });

//   if (!(await userSchema.isValid(req.body))) {
//     return res.status(400).json({ error: "Error on validate schema" });
//   }

//   const user = req.body;

//   const IsUserIndDB = await User.findOne({ username: user.username });

//   if (IsUserIndDB) {
//     const isValid = await IsUserIndDB.checkPassword(user.password);
//     if (isValid) {
//       console.log(user.password);
//       console.log(IsUserIndDB.password);
//       const payload = {
//         userId: IsUserIndDB._id,
//         username: IsUserIndDB.name,
//         roles: IsUserIndDB.roles,
//       };
//       await jwt.sign(
//         payload,
//         jwtSecret,
//         { expiresIn: "3600s" },
//         (err, token) => {
//           return res.send({
//             username: IsUserIndDB.username,
//             success: true,
//             token: token,
//           });
//         }
//       );
//     } else {
//       res.statusCode = 400;
//       res.send({
//         success: false,
//         message: "wrong credentials, try again later...",
//       });
//     }
//   } else {
//     res.statusCode = 400;
//     res.send({
//       success: false,
//       message: "wrong credentials, try again later...",
//     });
//   }
// });



//Usuários iniciais para lidar do mongodb
const createInitialUsers = async () => {
  //retorna a quantidade de usuários existentes nesse banco de dados
  const total = await User.count({});
  if (total === 0) {
    const user = new User({
      username: "admin",
      password: "123456",
      roles: ["restrito", "admin"],
    });
    await user.save();

    const user2 = new User({
      username: "restrito",
      password: "123456",
      roles: ["restrito"],
    });
    await user2.save();
  }
};

//conectando o mongo
mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //criando usuarios
    createInitialUsers();
    //fazendo o servidor escutar após a conexão com o banco
    app.listen(PORT, HOST, () => console.log(`Server on http://${HOST}:3005/`));
  })
  .catch((e) => console.log(e));
