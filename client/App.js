import { StyleSheet, View } from "react-native";
import Accordion from "./src/components/Accordion";
import CardAllocation from "./src/components/CardAllocation";

export default function App() {
  return (
    <View style={styles.container}>
      <Accordion
        children={
          <CardAllocation
            responsible="Fulano de Tal"
            discipline="Matemática"
            local="Sala 01"
            type="laboratory"
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
