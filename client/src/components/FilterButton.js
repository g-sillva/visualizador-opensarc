import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default FilterButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="filter" size={25} color="#ffffff" />
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
  },
});
