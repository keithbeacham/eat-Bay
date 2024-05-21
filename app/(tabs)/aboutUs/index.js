import { Text } from "react-native";
import { Stack } from "expo-router";

export default function AboutUs() {
  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{ headerShown: true, title: "About us" }}
      />
      <Text>This is the "about us" page</Text>
    </>
  );
}
