const socketClient = require("./socket/client");

setInterval(()=>{
    socketClient.emit("newCount", '645c08e4d2973c4a00def49f');
}, 3000)

socketClient.on("newCountTotal", (newTotal) => {
    console.log(newTotal);
  });
  