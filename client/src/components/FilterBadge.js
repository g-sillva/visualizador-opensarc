import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default FilterBadge = ({ value = "VAL", onPress }) => {
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
    onPress && onPress(value);
  };

  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={handlePress}
    >
      <Text style={[styles.badge, isActive && styles.activeBadge]}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  activeContainer: {
    backgroundColor: "#FA521D",
  },
  badge: {
    color: "#6B7280",
    fontWeight: "bold",
  },
  activeBadge: {
    color: "#F3F4F6",
  },
});
