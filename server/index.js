const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const meetingHandler = require("./socket/meeting.socket");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);
  meetingHandler(io, socket);
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
