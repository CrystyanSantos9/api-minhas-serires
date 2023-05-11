const swaggerAutogen = require("swagger-autogen")();
const a = require("./routes/series");

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "routes/counts.js",
];

// swaggerAutogen(outputFile, endpointsFiles).then(() => {
//   require("./server.js");
// });

swaggerAutogen(outputFile, endpointsFiles);
