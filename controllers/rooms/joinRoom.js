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

    socket.on("private-room-created", (data) => {
      roomNameSpace.emit("private-room-created", {
        roomId: data._id,
        guest: data.users[0],
        owner: data.owner,
      });
    });
  });
};

module.exports = {
  joinRoom: ctrlWrapper(joinRoom),
};
