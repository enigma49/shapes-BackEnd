const express = require("express");
const app = express();
const PORT = 8080;
const http = require("http");
const server = http.createServer(app);
const socket_io = require("socket.io");
const io = socket_io(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET"],
  },
});

io.on("connection", (socket) => {
  console.log("A USER CONNECTED");
  let retObj = {};
  setInterval(() => {
    let positionCircleX = Math.random() * 101 + "px";
    let positionCircleY = Math.random() * 101 + "px";
    let positionSquareX = Math.random() * 101 + "px";
    let positionSquareY = Math.random() * 101 + "px";
    let colorSquare = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    let colorCircle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    retObj = {
      positionCircleX: positionCircleX,
      positionCircleY: positionCircleY,
      positionSquareX: positionSquareX,
      positionSquareY: positionSquareY,
      colorCircle: colorCircle,
      colorSquare: colorSquare,
    };
    socket.emit("getDetails", retObj);
  }, 1000);
});

server.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
