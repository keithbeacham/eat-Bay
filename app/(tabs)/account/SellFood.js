import { Button, Text } from "react-native";
import { Stack, Redirect } from "expo-router";

export default function SellFood() {
  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{ headerShown: true, title: "Sell Food" }}
      />
      <Text>This is the shops "sell food" page </Text>
      <Button title="Sold" onPress={() => {}} />
    </>
  );
}
