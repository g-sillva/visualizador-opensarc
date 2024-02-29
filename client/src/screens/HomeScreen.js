import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

export default HomeScreen = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResources = async () => {
    setIsLoading(true);

    axios
      .get(
        process.env.EXPO_PUBLIC_SERVER_API_URL +
          "/crawl.json?spider_name=resource_spider&url=https://sarc.pucrs.br/Default/"
      )
      .then((resp) => {
        setResources(resp.data.items);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Recursos Alocados</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    margin: 20,
  },
});
