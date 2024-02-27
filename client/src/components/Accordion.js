import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Accordion = ({ hour, date, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotateZ = isOpen ? "180deg" : "0deg";

  const onPress = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.triggerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.hourText}>{hour || "00:00"}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <Ionicons
          name="chevron-down-outline"
          size={20}
          color="#8D8D8D"
          style={{ transform: [{ rotateZ }] }}
        />
      </TouchableOpacity>
      {isOpen && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    width: "98%",
  },
  triggerContainer: {
    display: "flex",
    flexDirection: "row",
    alignitems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  hourText: {
    fontSize: 18,
    color: "#111827",
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "#C7C7C7",
  },
});

export default Accordion;
