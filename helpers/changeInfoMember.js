const changeInfoMember = (room, owner) => {
  const otherUser = room.users.find(
    (user) => String(user._id) !== String(owner)
  );

  room.title = otherUser ? otherUser.name : "My private room";
  room.img = otherUser
    ? otherUser.avatarURL
    : "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y";

  return room;
};

module.exports = changeInfoMember;
