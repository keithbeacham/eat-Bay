import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function FoodItem({ foodItem }) {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={{ uri: foodItem.picture_url }} style={styles.image} />
      </View>
      <Text>{"\n"}</Text>
      <Text style={styles.bold20}>
        {"\n"}
        {foodItem.item_name}
      </Text>
      <Text style={styles.text15}>
        {"\n"}
        {foodItem.item_description}
      </Text>
      <Text style={styles.bold16}>
        {"\n"}
        {foodItem.quantity} available
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text15: {
    fontSize: 15,
  },
  bold20: {
    fontWeight: "bold",
    fontSize: 20,
  },
  bold16: {
    fontWeight: "bold",
    fontSize: 16,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
  },
});
