import { Text } from "react-native";
import { Stack } from "expo-router";

export default function Login() {
  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{ headerShown: true, title: "Login" }}
      />
      <Text>This is the login account page</Text>
    </>
  );
}
