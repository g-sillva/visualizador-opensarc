import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterFormSchema } from "../utils/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default FilterForm = ({ values, onSubmit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      responsible: values.responsible || "",
      subject: values.subject || "",
      time: values.time || "",
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
                <View style={styles.inputFieldWrapper}>
                  <View style={styles.inputField}>
                    <Ionicons name="person" size={20} color="#6B7280" />
                    <TextInput
                      placeholder="Nome do professor..."
                      style={styles.inputText}
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                  <TouchableOpacity onPress={() => onChange("")}>
                    <Ionicons name="close-outline" size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Disciplina</Text>
                <View style={styles.inputFieldWrapper}>
                  <View style={styles.inputField}>
                    <Ionicons name="school" size={20} color="#6B7280" />
                    <TextInput
                      placeholder="Disciplina..."
                      style={styles.inputText}
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                  <TouchableOpacity onPress={() => onChange("")}>
                    <Ionicons name="close-outline" size={20} color="#6B7280" />
                  </TouchableOpacity>
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
                <View style={styles.inputFieldWrapper}>
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
                  <TouchableOpacity onPress={() => onChange("")}>
                    <Ionicons name="close-outline" size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.filterButtonText}>FILTRAR</Text>
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
  inputFieldWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 5,
  },
  inputField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filterButton: {
    backgroundColor: "#FA521D",
    padding: 10,
    borderRadius: 50,
    width: "50%",
    alignSelf: "center",
  },
  filterButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
