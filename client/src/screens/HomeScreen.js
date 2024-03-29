import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import CardAllocation from "../components/CardAllocation";
import Accordion from "../components/Accordion";
import FilterButton from "../components/FilterButton";
import { monthsList, timeMap } from "../utils/constants";

export default HomeScreen = ({ onFilterBtnPress, onRefresh, filters }) => {
  const [resources, setResources] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredResources, setFilteredResources] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const date = new Date();
  const monthName = monthsList[date.getMonth()];
  const formattedDate = `${date.getDate()} ${monthName} ${date.getFullYear()}`;

  const fetchResources = async () => {
    setIsLoading(true);

    await axios
      .get(process.env.EXPO_PUBLIC_SERVER_API_URL + "/resources")
      .then((resp) => {
        setResources(resp.data.value[0]);
        setFilteredResources(resp.data.value[0]);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError("Algo deu errado! Por favor, tente novamente.");
      });

    setIsLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchResources();

    onRefresh && onRefresh();

    setRefreshing(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    setFilteredResources(resources);
  }, [resources]);

  useEffect(() => {
    let filteredItems = {};

    Object.entries(resources).forEach(([resource, items]) => {
      if (filters.time) {
        const timeSplit = filters.time.toLowerCase().split(",");
        const shouldFilter = timeSplit.some(
          (time) => timeMap[time[0]] === resource
        );
        if (!shouldFilter) return;
      }

      items.forEach((item) => {
        const responsibleMatches =
          !filters.responsible ||
          item.responsible
            .toLowerCase()
            .includes(filters.responsible.toLowerCase());
        const subjectMatches =
          !filters.subject ||
          item.subject.toLowerCase().includes(filters.subject.toLowerCase());

        if (responsibleMatches && subjectMatches) {
          filteredItems[resource] = filteredItems[resource] || [];
          filteredItems[resource].push(item);
        }
      });
    });

    setFilteredResources(filteredItems);
  }, [filters]);

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <Text style={styles.titleText}>Recursos Alocados</Text>
        {isLoading ? (
          <Text style={styles.infoText}>Carregando os recursos... 🚀</Text>
        ) : error ? (
          <View>
            <Text style={styles.infoText}>{error}</Text>
          </View>
        ) : Object.keys(filteredResources).length === 0 ? (
          <Text style={styles.infoText}>Nenhum recurso foi encontrado 😕</Text>
        ) : (
          Object.keys(filteredResources).map((time, i) => (
            <Accordion key={i} time={time} date={formattedDate}>
              {filteredResources[time].map((resource, j) => (
                <View key={j}>
                  <CardAllocation
                    responsible={resource.responsible}
                    subject={resource.subject}
                    resource={resource.resource}
                    time={resource.time}
                    type={resource.type}
                  />
                </View>
              ))}
            </Accordion>
          ))
        )}
      </ScrollView>
      {!isLoading && !error && (
        <View style={styles.filterButton}>
          <FilterButton onPress={onFilterBtnPress} filters={filters} />
        </View>
      )}
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
    textAlign: "center",
    margin: 10,
  },
  filterButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  infoText: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 14,
  },
});
