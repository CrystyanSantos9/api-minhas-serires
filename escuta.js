const socketClient = require("./socket/client");

socketClient.on("newCountTotal", (newTotal) => {
  console.log(newTotal);
});
