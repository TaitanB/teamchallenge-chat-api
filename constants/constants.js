const perPage = 6;

const msgPerPage = 10; // 50

const nameRegex = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\d\s'’._-]*$/;

const textRegex = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\d\s.,&@'’():;!?"$*+/%-=_]*$/;

const topicsEnum = {
  NUTRITION: "Nutrition",
  EXERCISES: "Physical exercises",
  MENTAL_HEALTH: "Mental health",
  PREVENTION: "Preventive medicine",
  HEALTHY_HABITS: "Healthy habits",
};

module.exports = {
  perPage,
  msgPerPage,
  nameRegex,
  textRegex,
  topicsEnum,
};
