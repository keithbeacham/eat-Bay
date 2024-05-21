import React from "react";
import { View, Text, Button } from "react-native";
import { Stack, Link, useLocalSearchParams, useRouter } from "expo-router";

export default function ViewFood() {
  const params = useLocalSearchParams();
  console.log(params);
  const router = useRouter();

  return (
    <>
      <View>
        <Stack.Screen
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          options={{ headerShown: false, title: "Food List" }}
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
