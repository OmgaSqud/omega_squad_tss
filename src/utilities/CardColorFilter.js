/* eslint-disable default-case */
function CardColorFilter(subject) {
  let bgcolor;
  switch (subject) {
    case "Com.Maths":
      bgcolor = "#F78A8A";
      break;
    case "Biology":
      bgcolor = "#3FCE57";
      break;
    case "Physics":
      bgcolor = "#E0E641";
      break;
    case "Chemistry":
      bgcolor = "#5174FF";
      break;
    case "English":
      bgcolor = "#F540F5";
      break;
    default:
  }
  return bgcolor;
}

module.exports = CardColorFilter;
