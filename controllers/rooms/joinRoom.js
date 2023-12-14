const { ctrlWrapper } = require("../../decorators");

const joinRoom = (io) => {
  const roomNameSpace = io.of("/roomNameSpace");

  console.log("joinRoom");

  roomNameSpace.on("connection", (socket) => {
    socket.on("join", (data) => {
      // console.log("join", data);
      socket.join(data.room);

      // roomNameSpace.in(data.room).emit("message", {
      //   msg: `${data.nick ? "" : "New user "}joined ${data.room} room`,
      //   nick: data.nick,
      //   date: data.date,
      // });
    });

    socket.on("leave", (data) => {
      // console.log("leave", data);
      socket.leave(data.room);
    });

    socket.on("message", (data) => {
      roomNameSpace.in(data.room).emit("message", {
        data: data.msg,
        // msg: data.msg,
        // nick: data.nick,
        // date: data.date,
      });
    });

    // const typingUsers = {};

    // socket.on("user-start-write", (data) => {
    //   const { userId, nick, room } = data;

    //   if (!typingUsers[room]) {
    //     typingUsers[room] = [];
    //   }

    //   if (!typingUsers[room].some((user) => user.id === userId)) {
    //     typingUsers[room].push({ id: userId, nick: nick });
    //     updateTypingStatus(room);
    //   }
    // });

    // socket.on("user-end-write", (data) => {
    //   const { userId, room } = data;

    //   if (typingUsers[room]) {
    //     const index = typingUsers[room].findIndex((user) => user.id === userId);
    //     if (index !== -1) {
    //       typingUsers[room].splice(index, 1);
    //       updateTypingStatus(room);
    //     }
    //   }
    // });

    // function updateTypingStatus(room) {
    //   const usersArray = typingUsers[room] || [];
    //   roomNameSpace
    //     .in(room)
    //     .emit("update-typing-status", { typingUsers: usersArray });
    // }

    socket.on("user-start-write", (data) => {
      // console.log(data);
      roomNameSpace
        .in(data.room)
        .emit("user-start-write", { id: data.userId, nick: data.nick });
    });

    socket.on("user-end-write", (data) => {
      // console.log(data);
      roomNameSpace
        .in(data.room)
        .emit("user-end-write", { id: data.userId, nick: data.nick });
    });
  });
};

module.exports = {
  joinRoom: ctrlWrapper(joinRoom),
};
