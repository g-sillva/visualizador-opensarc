import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import CardAllocation from "../components/CardAllocation";
import Accordion from "../components/Accordion";

export default HomeScreen = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const date = new Date();
  const formattedDate = `${date.getDate()} ${getMonthName(
    date.getMonth()
  )} ${date.getFullYear()}`;

  function getMonthName(month) {
    const monthNames = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];
    return monthNames[month];
  }

  const fetchResources = async () => {
    setIsLoading(true);

    axios
      .get(
        process.env.EXPO_PUBLIC_SERVER_API_URL +
          "/crawl.json?spider_name=resource_spider&url=https://sarc.pucrs.br/Default/"
      )
      .then((resp) => {
        setResources(resp.data.items[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Recursos Alocados</Text>
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        Object.keys(resources).map((time, i) => (
          <Accordion key={i} time={time} date={formattedDate}>
            {resources[time].map((resource, j) => (
              <CardAllocation
                key={j}
                responsible={resource.responsible}
                discipline={resource.discipline}
                resource={resource.resource}
                time={resource.time}
                type={resource.type}
              />
            ))}
          </Accordion>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    margin: 10,
  },
});
