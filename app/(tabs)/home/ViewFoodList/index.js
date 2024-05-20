import React from "react";
import { Text } from "react-native";
import { Stack, Link } from "expo-router";

export default function ViewFoodList() {
  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{ headerShown: true, title: "FoodList" }}
      />
      <Text>This is the view-food-list screen</Text>
      <Link href={"/(tabs)/home/ViewFoodList/ViewFood"} name="ViewFood">
        <Text>click here to go to the food item page</Text>
      </Link>
    </>
  );
}
