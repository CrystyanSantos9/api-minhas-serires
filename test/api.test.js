const request = require("supertest");
const app = require("../app"); //definições da nossa aplicação
const expect = require("chai").expect; //usado para verificar o valor que esperamos no teste

const mongoose = require("mongoose");
const mongo = process.env.MONGO || "mongodb://192.168.1.110/api-minhas-series";

before("connecting to mongodb", async () => {
  //espera conectar
  await mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});


describe("Testando rest API", () => {
  it("should return a list of counts", async () => {
    const apiResponse = await request(app).get("/counts");

    const idExpected = "645cd7a2eecd38584e9fd50c";

    // console.log(apiResponse);

    expect(apiResponse.statusCode).equal(200);
    expect(apiResponse.body).to.exist;
    expect(apiResponse.body).to.not.be.empty;
    expect(apiResponse.body).to.be.an("array").that.is.not.empty;
    expect(apiResponse.body[0]).to.have.a.property("_id");
    expect(apiResponse.body[0]).to.include({ _id: idExpected });
    expect(apiResponse.body[0]).to.include({ description: "padaria" });

    console.log(apiResponse.body[0]);
  });
});
