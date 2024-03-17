import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const CardAllocation = ({ responsible, subject, resource, time, type }) => {
  return (
    <View style={styles.container}>
      <View>
        {type === "laboratory" ? (
          <Ionicons name="laptop-outline" size={25} color="#6B7280" />
        ) : type === "auditorium" ? (
          <Ionicons name="easel-outline" size={25} color="#6B7280" />
        ) : (
          <Ionicons name="school-outline" size={25} color="#6B7280" />
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.responsibleText}>{responsible}</Text>
        </View>
        <Text style={styles.titleText}>{subject}</Text>
        <Text style={styles.resourceText}>
          {time} - {resource}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 20,
    width: "100%",
    borderRadius: 10,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    flex: 1,
  },
  contentHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  responsibleText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "light",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resourceText: {
    fontSize: 12,
    fontWeight: "light",
    color: "#6B7280",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
export default CardAllocation;
