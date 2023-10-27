const nameRegex = /[А-ЯЁІЇЄҐа-яёіїєґA-Za-z'-]{2,26}/;

const perPage = 50;

const topicsEnum = {
  TOPIC_1: "topic-1",
  TOPIC_2: "topic-2",
  TOPIC_3: "topic-3",
  TOPIC_4: "topic-4",
  TOPIC_5: "topic-5",
  TOPIC_6: "topic-6",
  TOPIC_7: "topic-7",
  TOPIC_8: "topic-8",
  TOPIC_9: "topic-9",
  TOPIC_10: "topic-10",
};

const roomsEnum = {
  ROOM_1: "room-1",
  ROOM_2: "room-2",
  ROOM_3: "room-3",
  ROOM_4: "room-4",
  ROOM_5: "room-5",
};

module.exports = {
  nameRegex,
  perPage,
  topicsEnum,
  roomsEnum,
};
