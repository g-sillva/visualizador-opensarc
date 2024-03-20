import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import CardAllocation from "../components/CardAllocation";
import Accordion from "../components/Accordion";
import FilterButton from "../components/FilterButton";
import { monthsList, timeMap } from "../utils/constants";

export default HomeScreen = ({ onFilterBtnPress, filters }) => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const date = new Date();
  const monthName = monthsList[date.getMonth()];
  const formattedDate = `${date.getDate()} ${monthName} ${date.getFullYear()}`;

  const fetchResources = async () => {
    setIsLoading(true);

    await axios
      .get(
        process.env.EXPO_PUBLIC_SERVER_API_URL +
          "/crawl.json?spider_name=resource_spider&url=https://sarc.pucrs.br/Default/"
      )
      .then((resp) => {
        setResources(resp.data.items[0]);
        setFilteredResources(resp.data.items[0]);
      })
      .catch((error) => {
        console.log(error);
        setError("Algo deu errado! Por favor, tente novamente.");
      });

    setIsLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    setFilteredResources(resources);
  }, [resources]);

  useEffect(() => {
    let filteredItems = {};

    Object.keys(resources).forEach((resource) => {
      if (filters.time) {
        let shouldFilter = true;
        const timesSplit = filters.time.toLowerCase().split(",");

        timesSplit.forEach((time) => {
          const first = timeMap[time[0]];
          if (first === resource) shouldFilter = false;
        });

        if (shouldFilter) return;
      }

      resources[resource].forEach((item) => {
        if (
          item.responsible &&
          item.responsible
            .toLowerCase()
            .includes(filters.responsible.toLowerCase()) &&
          item.subject &&
          item.subject.toLowerCase().includes(filters.subject.toLowerCase())
        ) {
          if (!filteredItems[resource]) {
            filteredItems[resource] = [];
          }
          filteredItems[resource].push(item);
        }
      });
    });

    setFilteredResources(filteredItems);
  }, [filters]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>Recursos Alocados</Text>
        {isLoading ? (
          <Text>Carregando...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          Object.keys(filteredResources).map((time, i) => (
            <Accordion key={i} time={time} date={formattedDate}>
              {filteredResources[time].map((resource, j) => (
                <CardAllocation
                  key={j}
                  responsible={resource.responsible}
                  subject={resource.subject}
                  resource={resource.resource}
                  time={resource.time}
                  type={resource.type}
                />
              ))}
            </Accordion>
          ))
        )}
      </ScrollView>
      <View style={styles.filterButton}>
        <FilterButton onPress={onFilterBtnPress} />
      </View>
    </View>
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
  filterButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});
