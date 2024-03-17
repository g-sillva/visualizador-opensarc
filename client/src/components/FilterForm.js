import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default FilterForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filtrar</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Responsável</Text>
          <View style={styles.inputField}>
            <Ionicons name="person" size={20} color="#6B7280" />
            <TextInput
              placeholder="Nome do professor..."
              style={styles.inputText}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Dia</Text>
          <View style={styles.inputField}>
            <Ionicons name="calendar" size={20} color="#6B7280" />
            <TextInput
              placeholder="Dia da semana..."
              style={styles.inputText}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Disciplina</Text>
          <View style={styles.inputField}>
            <Ionicons name="school" size={20} color="#6B7280" />
            <TextInput placeholder="Disciplina..." style={styles.inputText} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Horário</Text>
          <View style={styles.inputField}>
            <Ionicons name="time" size={20} color="#6B7280" />
            <TextInput placeholder="Ex.: JK" style={styles.inputText} />
          </View>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>FILTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    flex: 1,
  },
  header: {
    display: "flex",
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
  },
  form: {
    marginTop: 20,
    display: "flex",
    gap: 30,
  },
  inputContainer: {
    display: "flex",
    gap: 10,
  },
  inputLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  inputField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 5,
  },
  inputText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#FA521D",
    padding: 10,
    borderRadius: 50,
    width: "50%",
    alignSelf: "center",
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
