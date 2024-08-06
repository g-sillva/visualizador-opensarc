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
