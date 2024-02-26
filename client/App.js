import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CardAlocacao from "./src/components/CardAlocacao";

export default function App() {
  return (
    <View style={styles.container}>
      <CardAlocacao
        responsavel="Azriel Majdenbaum"
        disciplina="Engenharia de Requisitos"
        local="17:30 - Laboratórios 309/312"
        tipo="laboratorio"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
