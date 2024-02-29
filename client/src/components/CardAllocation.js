import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const CardAllocation = ({ responsible, discipline, resource, time, type }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleNotification = () => {
    setIsNotification(!isNotification);
  };

  const handleOptionsClick = () => {};

  return (
    <View style={styles.container}>
      <View>
        {type === "laboratory" ? (
          <Ionicons name="laptop-outline" size={25} color="#6B7280" />
        ) : tipo === "auditorium" ? (
          <Ionicons name="easel-outline" size={25} color="#6B7280" />
        ) : (
          <Ionicons name="school-outline" size={25} color="#6B7280" />
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.responsibleText}>{responsible}</Text>
          <View style={styles.iconsContainer}>
            {isFavorite ? (
              <Ionicons
                name="star"
                size={16}
                color="#F4E328"
                onPress={handleFavorite}
              />
            ) : (
              <Ionicons
                name="star-outline"
                size={16}
                color="#6B7280"
                onPress={handleFavorite}
              />
            )}
            {isNotification ? (
              <Ionicons
                name="notifications"
                size={16}
                color="#FA521D"
                onPress={handleNotification}
              />
            ) : (
              <Ionicons
                name="notifications-outline"
                size={16}
                color="#6B7280"
                onPress={handleNotification}
              />
            )}
            <Ionicons
              name="ellipsis-vertical-outline"
              size={16}
              color="#6B7280"
              onPress={handleOptionsClick}
            />
          </View>
        </View>
        <Text style={styles.titleText}>{discipline}</Text>
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
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
export default CardAllocation;
