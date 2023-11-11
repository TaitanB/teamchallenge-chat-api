const mongoose = require("mongoose");
const socketIO = require("socket.io");
const app = require("./app");
const { joinRoom } = require("./controllers/rooms/joinRoom");
const addDefaultRooms = require("./servises/addDefaultRooms");
const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    addDefaultRooms();
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

joinRoom(io);

// const nodeNameSpace = io.of("/nodeNameSpace");

// nodeNameSpace.on("connection", (socket) => {
//   // console.log(socket.handshake.query);
//   socket.on("join", (data) => {
//     socket.join(data.room);
//     // console.log(data);
//     // console.log(
//     //   "room => ",
//     //   data.room,
//     //   ", nick => ",
//     //   data.nick,
//     //   ", roomId => ",
//     //   data.roomId
//     // );

//     nodeNameSpace.in(data.room).emit("message", {
//       msg: `${data.nick ? "" : "New user "}joined ${data.room} room`,
//       nick: data.nick,
//       date: data.date,
//     });
//   });

//   socket.on("message", (data) => {
//     // console.log(data);
//     // console.log(
//     //   "message => ",
//     //   data.msg,
//     //   ", roomId => ",
//     //   data.roomId,
//     //   ", nick => ",
//     //   data.nick
//     // );

//     nodeNameSpace.in(data.room).emit("message", {
//       msg: data.msg,
//       nick: data.nick,
//       date: data.date,
//     });
//   });
// });

// module.exports = io;
