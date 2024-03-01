import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

export default FilterForm = () => {
  const [filter, setFilter] = useState({
    resource: "",
    responsible: "",
    discipline: "",
    time: "",
    type: "",
  });

  const handleFilterChange = (field, value) => {
    setFilter({ ...filter, [field]: value });
    console.log(filter);
  };

  const filters = [
    {
      label: "Recurso",
      value: filter.resource,
      onChange: (value) => handleFilterChange("resource", value),
    },
    {
      label: "Responsável",
      value: filter.responsible,
      onChange: (value) => handleFilterChange("responsible", value),
    },
    {
      label: "Disciplina",
      value: filter.discipline,
      onChange: (value) => handleFilterChange("discipline", value),
    },
    {
      label: "Hora",
      value: filter.time,
      onChange: (value) => handleFilterChange("time", value),
    },
    {
      label: "Tipo",
      value: filter.type,
      onChange: (value) => handleFilterChange("type", value),
    },
  ];

  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Filtrar</Text>
          <Ionicons name="filter" size={20} color="#373737" />
        </View>
        <View style={styles.contentContainer}>
          {filters.map((filter, i) => (
            <View style={styles.filterField} key={i}>
              <Text style={styles.filterLabel}>{filter.label}</Text>
              <TextInput
                placeholder={filter.label}
                style={styles.filterInput}
                value={filter.value}
                onChangeText={filter.onChange}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    // backgroundColor: "red",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  contentContainer: {
    marginTop: 22,
    display: "flex",
    gap: 20,
  },
  filterField: {
    display: "flex",
    gap: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filterInput: {
    width: "100%",
    padding: 16,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
  },
});
