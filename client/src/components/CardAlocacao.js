import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const CardAlocacao = ({ responsavel, disciplina, local, tipo }) => {
  const [isFavorito, setIsFavorito] = useState(false);
  const [isNotificacao, setIsNotificacao] = useState(false);

  const handleFavorito = () => {
    setIsFavorito(!isFavorito);
  };

  const handleNotificacao = () => {
    setIsNotificacao(!isNotificacao);
  };

  const handleOpcoes = () => {};

  return (
    <View style={styles.container}>
      <View>
        {tipo === "laboratorio" ? (
          <Ionicons name="laptop-outline" size={25} color="#6B7280" />
        ) : tipo === "auditorio" ? (
          <Ionicons name="easel-outline" size={25} color="#6B7280" />
        ) : (
          <Ionicons name="school-outline" size={25} color="#6B7280" />
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.responsibleText}>{responsavel}</Text>
          <View style={styles.iconsContainer}>
            {isFavorito ? (
              <Ionicons
                name="star"
                size={16}
                color="#F4E328"
                onPress={handleFavorito}
              />
            ) : (
              <Ionicons
                name="star-outline"
                size={16}
                color="#6B7280"
                onPress={handleFavorito}
              />
            )}
            {isNotificacao ? (
              <Ionicons
                name="notifications"
                size={16}
                color="#FA521D"
                onPress={handleNotificacao}
              />
            ) : (
              <Ionicons
                name="notifications-outline"
                size={16}
                color="#6B7280"
                onPress={handleNotificacao}
              />
            )}
            <Ionicons
              name="ellipsis-vertical-outline"
              size={16}
              color="#6B7280"
              onPress={handleOpcoes}
            />
          </View>
        </View>
        <Text style={styles.titleText}>{disciplina}</Text>
        <Text style={styles.locationText}>{local}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 20,
    width: "100%",
    borderRadius: 10,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
    flex: 1,
  },
  contentHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  responsibleText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "light",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 12,
    fontWeight: "light",
    color: "#6B7280",
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
export default CardAlocacao;
