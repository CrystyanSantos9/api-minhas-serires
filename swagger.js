const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["routes/series.js", "routes/users.js"];

// swaggerAutogen(outputFile, endpointsFiles).then(() => {
//   require("./server.js");
// });

swaggerAutogen(outputFile, endpointsFiles);
