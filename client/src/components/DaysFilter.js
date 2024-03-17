import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import FilterBadge from "./FilterBadge";
import { daysList } from "../utils/constants";

export default DaysFilter = ({ onChange }) => {
  const [selectedValue, setSelectedValue] = useState([]);

  const onChangeValues = (day) => {
    if (selectedValue.includes(day)) {
      setSelectedValue(selectedValue.filter((value) => value !== day));
    } else {
      setSelectedValue((prev) => [...prev, day]);
    }
  };

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      {daysList.map((day) => (
        <FilterBadge
          key={day}
          value={day}
          onChange={onChangeValues}
          selected={selectedValue.includes(day)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
