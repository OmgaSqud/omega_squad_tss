function DaysMapper(day) {
  let index;
  switch (day) {
    case "Monday":
      index = 0;
      break;
    case "Tuesday":
      index = 1;
      break;
    case "Wednesday":
      index = 2;
      break;
    case "Thursday":
      index = 3;
      break;
    case "Friday":
      index = 4;
      break;
    default:
  }
  return index;
}

function DayRetriever(index) {
  let day;
  switch (index) {
    case 0:
      day = "Monday";
      break;
    case 1:
      day = "Tuesday";
      break;
    case 2:
      day = "Wednesday";
      break;
    case 3:
      day = "Thursday";
      break;
    case 4:
      day = "Friday";
      break;
    default:
  }
  return day;
}

module.exports = { DaysMapper, DayRetriever };
