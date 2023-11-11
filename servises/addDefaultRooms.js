const Room = require("../models/room");

const defaultRooms = require("../constants/defaultRooms");

async function addDefaultRooms() {
  try {
    const existingRooms = await Room.find();

    if (existingRooms.length === 0) {
      for (const roomData of defaultRooms) {
        const room = new Room(roomData);
        await room.save();
      }
      console.log("Default rooms added successfully");
    } else {
      console.log("Default rooms already exist");
    }
  } catch (error) {
    console.error("Error adding default rooms:", error);
  }
}

module.exports = addDefaultRooms;
