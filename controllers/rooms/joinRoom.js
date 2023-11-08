const { ctrlWrapper } = require("../../decorators");

const joinRoom = (io) => {
  const roomNameSpace = io.of("/roomNameSpace");

  console.log("joinRoom");
  roomNameSpace.on("connection", (socket) => {
    socket.on("join", (data) => {
      socket.join(data.room);
      // console.log(
      //   "room => ",
      //   data.room,
      //   ", nick => ",
      //   data.nick,
      //   ", roomId => ",
      //   data.roomId
      // );

      roomNameSpace.in(data.room).emit("message", {
        msg: `${data.nick ? "" : "New user "}joined ${data.room} room`,
        nick: data.nick,
        date: data.date,
      });
    });

    socket.on("message", (data) => {
      // console.log(
      //   "message => ",
      //   data.msg,
      //   ", roomId => ",
      //   data.roomId,
      //   ", nick => ",
      //   data.nick
      // );

      roomNameSpace.in(data.room).emit("message", {
        msg: data.msg,
        nick: data.nick,
        date: data.date,
      });
    });

    socket.on("user-start-write", (data) => {
      // console.log(data);
      roomNameSpace.in(data.room).emit("user-start-write", { nick: data.nick });
    });

    socket.on("user-end-write", (data) => {
      // console.log(data);
      roomNameSpace.in(data.room).emit("user-end-write", { nick: data.nick });
    });
  });
};

module.exports = {
  joinRoom: ctrlWrapper(joinRoom),
};
