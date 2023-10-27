const mongoose = require("mongoose");
const socketIO = require("socket.io");
const app = require("./app");

const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    // app.listen(3001);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const port = PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = socketIO(server);

const nodeNameSpace = io.of("/nodeNameSpace");

nodeNameSpace.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.room);

    console.log("room => ", data.room, ", nick => ", data.nick);

    nodeNameSpace.in(data.room).emit("message", {
      msg: `${data.nick ? "" : "New user "}joined ${data.room} room`,
      nick: data.nick,
    });
  });

  socket.on("message", (data) => {
    console.log(
      "message => ",
      data.msg,
      ", room => ",
      data.room,
      ", nick => ",
      data.nick
    );

    nodeNameSpace
      .in(data.room)
      .emit("message", { msg: data.msg, nick: data.nick });
  });
});

module.exports = server;
