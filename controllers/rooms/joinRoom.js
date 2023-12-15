const { ctrlWrapper } = require("../../decorators");

const joinRoom = (io) => {
  const roomNameSpace = io.of("/roomNameSpace");

  roomNameSpace.on("connection", (socket) => {
    socket.on("join", (data) => {
      socket.join(data.room);
    });

    socket.on("leave", (data) => {
      socket.leave(data.room);
    });

    socket.on("message", (data) => {
      roomNameSpace.in(data.room).emit("message", {
        data: data.msg,
      });
    });

    socket.on("user-start-write", (data) => {
      roomNameSpace
        .in(data.room)
        .emit("user-start-write", { id: data.userId, nick: data.nick });
    });

    socket.on("user-end-write", (data) => {
      roomNameSpace
        .in(data.room)
        .emit("user-end-write", { id: data.userId, nick: data.nick });
    });
  });
};

module.exports = {
  joinRoom: ctrlWrapper(joinRoom),
};
