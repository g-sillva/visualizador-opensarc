export const convertResourceTypeText = (type: string) => {
  if (type === "laboratory") {
    return "Laboratório";
  } else if (type === "auditorium") {
    return "Auditório";
  } else {
    return "Sala de aula";
  }
};

export const convertResourceTypeIcon = (type: string) => {
  if (type === "laboratory") {
    return "computer";
  } else if (type === "auditorium") {
    return "podium";
  } else {
    return "school";
  }
};

export const convertTimeCode = (timeCode: string) => {
  if (timeCode === "AB") return "08:00 - 09:30";
  if (timeCode === "CD") return "09:45 - 11:15";
  if (timeCode === "EX") return "11:30 - 13:00";
  if (timeCode === "FG") return "14:00 - 15:30";
  if (timeCode === "HI") return "15:45 - 17:15";
  if (timeCode === "JK") return "17:30 - 19:00";
  if (timeCode === "LM") return "19:15 - 20:45";
  if (timeCode === "NP") return "21:00 - 22:30";
};

export const convertIconFromType = (type: string) => {
  if (type === "laboratory") return "computer";
  if (type === "auditorium") return "podium";
  if (type === "classroom") return "school";
};
