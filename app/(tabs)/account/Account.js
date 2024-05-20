import { Text } from "react-native";
import { Stack } from "expo-router";

export default function Account() {
  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{ headerShown: true, title: "Account" }}
      />
      <Text>This is the Account page</Text>
    </>
  );
}
