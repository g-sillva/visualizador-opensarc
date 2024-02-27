import { StyleSheet, Text, View } from "react-native";
import CardAlocacao from "./src/components/CardAlocacao";
import Accordion from "./src/components/Accordion";

export default function App() {
  return (
    <View style={styles.container}>
      <Accordion
        children={
          <CardAlocacao
            responsavel="Fulano de Tal"
            disciplina="Matemática"
            local="Sala 01"
            tipo="sala"
          />
        }
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
