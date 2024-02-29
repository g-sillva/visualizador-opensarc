import { StyleSheet, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
      {/* <Accordion
        children={
          <CardAllocation
            responsible="Fulano de Tal"
            discipline="Matemática"
            resource="Sala 01"
            type="laboratory"
          />
        }
      /> */}
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
