import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default NotificationButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Ionicons name="notifications" size={25} color="#ffffff" />
      <View style={styles.addIcon}>
        <Ionicons name="add" size={18} color="#ffffff" />
      </View>
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
  addIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#FA521D",
    borderRadius: 50,
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
