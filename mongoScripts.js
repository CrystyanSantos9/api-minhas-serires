const { default: mongoose } = require("mongoose");
const mongo = process.env.MONGO || "mongodb://192.168.1.110/api-minhas-series";

const Count = require("./models/count");

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Count.deleteMany();
  })
  .catch((e) => console.log(e));
