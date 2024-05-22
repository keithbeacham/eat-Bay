import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Stack, Link, useLocalSearchParams, useRouter } from "expo-router";
import MapView from "react-native-maps";

export default function ViewFood() {
  const params = useLocalSearchParams();
  console.log(params);
  const router = useRouter();

  return (
    <>
      <MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} />
      <View
        style={{
          position: "absolute",
          top: "5%",
          left: "10%",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          height: "90%",
          backgroundColor: "rgba(197, 197, 197, 0.9)",
          borderRadius: "10px",
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <Text>This is the view-food-list screen</Text>
        <Link href={"/home/food-item-16"}>
          <Text>click here to go to the food item page</Text>
        </Link>
        <Button
          title="Add Item (if you are a shop)"
          onPress={() => {
            router.replace("/home/AddFood");
          }}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "95%",
  },
});
