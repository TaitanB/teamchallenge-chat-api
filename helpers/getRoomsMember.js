const getRoomsMember = (rooms, owner) => {
  const roomsMember = rooms.map((room) => {
    let roomMember = room.users.find(
      (user) => String(user._id) === String(owner)
    );

    if (roomMember) {
      roomMember = { room: room, member: true };
    } else {
      roomMember = { room: room };
    }

    return roomMember;
  });
  return roomsMember;
};

module.exports = getRoomsMember;
