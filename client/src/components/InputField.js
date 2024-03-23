import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default InputField = ({
  onChange,
  value,
  label = "Label",
  placeholder,
  icon,
  clearIcon,
  autoCapitalize = "none",
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.inputField}>
          {icon && <Ionicons name={icon} size={20} color="#6B7280" />}
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            readOnly={disabled}
            autoCapitalize={autoCapitalize}
            style={disabled ? { color: "#6B7280" } : { color: "#313135" }}
          />
        </View>
        {clearIcon && value != "" && (
          <TouchableOpacity onPress={() => onChange("")}>
            <Ionicons name="close-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  label: {
    fontSize: 14,
    color: "#313135",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 10,
    borderRadius: 10,
  },
  inputField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
