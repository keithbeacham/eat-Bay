import { Stack, Screen } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "space-between",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="ViewFoodList" options={{ headerShown: false }} />
    </Stack>
  );
}
