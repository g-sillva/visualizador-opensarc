import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterFormSchema } from "../utils/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DaysFilter from "./DaysFilter";

export default FilterForm = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      responsible: "",
      day: [],
      subject: "",
      time: "",
    },
    resolver: zodResolver(filterFormSchema),
  });

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Filtrar</Text>
        </View>
        <View style={styles.form}>
          <Controller
            control={control}
            name="responsible"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Responsável</Text>
                <View style={styles.inputField}>
                  <Ionicons name="person" size={20} color="#6B7280" />
                  <TextInput
                    placeholder="Nome do professor..."
                    style={styles.inputText}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              </View>
            )}
          />
          <Controller
            control={control}
            name="day"
            render={({ field: { onChange } }) => {
              return (
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Dia</Text>
                  <DaysFilter onChange={onChange} />
                </View>
              );
            }}
          />
          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Disciplina</Text>
                <View style={styles.inputField}>
                  <Ionicons name="school" size={20} color="#6B7280" />
                  <TextInput
                    placeholder="Disciplina..."
                    style={styles.inputText}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              </View>
            )}
          />
          <Controller
            control={control}
            name="time"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Horário</Text>
                <View style={styles.inputField}>
                  <Ionicons name="time" size={20} color="#6B7280" />
                  <TextInput
                    autoCapitalize="characters"
                    placeholder="Ex.: JK,NP"
                    style={styles.inputText}
                    value={value}
                    onChangeText={onChange}
                  />
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.addButtonText}>FILTRAR</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
