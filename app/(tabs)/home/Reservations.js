import React from "react";
import { View, Text, Button } from "react-native";
import { Stack, Link, useRouter } from "expo-router";

export default function ViewTransactions() {
  const router = useRouter();

  return (
    <>
      <View>
        <Stack.Screen
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          options={{ headerShown: false, title: "Transaction List" }}
        />
        <Text>This is the "view users transactions" screen</Text>
        <Button
          title="go back to food list"
          onPress={() => router.replace("/home/ViewFoodList")}
        />
      </View>
    </>
  );
}
