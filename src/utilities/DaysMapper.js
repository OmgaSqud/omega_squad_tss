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

module.exports = DaysMapper;
