import { Colors } from "@/constants/Colors";
import { House } from "@/models/home";
import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface Props {
  house: House;
}
const Card = (props: Props) => {
  const { house } = props;
  const handleClick = () => {
    router.navigate(`/house/${house.id}`);
  };

  return (
    <TouchableOpacity onPress={handleClick} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: house.imageUrl }} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{house.title}</Text>
      </View>
      <View style={styles.content}>
        <Text numberOfLines={3} style={styles.text}>
          {house.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.white,
    borderRadius: 15,
    shadowColor: Colors.light.brandPurple,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: 350,
    height: 400,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 12,
  },
  header: {
    marginVertical: 16,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.light.brandPurple,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 17,
    color: "#444444",
    textAlign: "left",
  },
  image: {
    height: 200,
    width: 350,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  imageContainer: {},
});

export default Card;
