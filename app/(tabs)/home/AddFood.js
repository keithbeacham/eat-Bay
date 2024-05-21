import { Button, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function AddFood() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{ headerShown: true, title: "Add Food" }}
      />
      <Text>This is the shops "add food" page </Text>
      <Button
        title="Add Item"
        onPress={() => {
          router.replace("/home/ViewFoodList");
        }}
      />
    </>
  );
}
