import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterFormSchema } from "../utils/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputField from "./InputField";

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
              <InputField
                label="Responsável"
                value={value}
                onChange={onChange}
                placeholder="Nome do professor..."
                icon="person"
                clearIcon
              />
            )}
          />
          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Disciplina"
                value={value}
                onChange={onChange}
                placeholder="Disciplina..."
                icon="school"
                clearIcon
              />
            )}
          />
          <Controller
            control={control}
            name="time"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Horário"
                value={value}
                onChange={onChange}
                placeholder="Ex.: JK,NP"
                icon="time"
                autoCapitalize="characters"
                clearIcon
              />
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
