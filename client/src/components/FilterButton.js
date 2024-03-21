import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default FilterButton = ({ onPress, filters }) => {
  const filtersQuantity = Object.values(filters).filter(
    (filter) => filter !== ""
  ).length;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="funnel" size={25} color="#ffffff" />
      {filtersQuantity !== 0 && (
        <View style={styles.quantity}>
          <Text style={styles.quantityText}>{filtersQuantity}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: "#FA521D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  quantity: {
    backgroundColor: "#FA521D",
    position: "absolute",
    bottom: 10,
    right: 12,
    borderRadius: 50,
    width: 18,
    height: 18,
    display: "flex",
    alignItems: "center",
  },
  quantityText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
