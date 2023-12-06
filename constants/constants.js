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

// const topicsEnum = {
//   NUTRITION: {
//     en: "Nutrition",
//     uk: "Здорове харчування",
//   },
//   EXERCISES: {
//     en: "Physical exercises",
//     uk: "Фізичні навантаження",
//   },
//   MENTAL_HEALTH: {
//     en: "Mental health",
//     uk: "Ментальне здоров'я",
//   },
//   PREVENTION: {
//     en: "Preventive medicine",
//     uk: "Превентивна медицина",
//   },
//   HEALTHY_HABITS: {
//     en: "Healthy habits",
//     uk: "Здорові звички",
//   },
// };

module.exports = {
  perPage,
  msgPerPage,
  nameRegex,
  textRegex,
  topicsEnum,
};
