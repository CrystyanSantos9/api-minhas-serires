const io = require("socket.io-client");

const socketClient = io.connect("http://localhost:3005");

socketClient.emit("join", "645c08e4d2973c4a00def49f");

module.exports = socketClient;
