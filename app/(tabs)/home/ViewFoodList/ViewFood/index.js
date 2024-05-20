import { Text } from "react-native";
import { Stack } from "expo-router";
import { Button } from "react-native";

export default function ViewFood() {
  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
      <Text>This is the view-food-item screen</Text>
      {/* <Button onClick={()=> } */}
    </>
  );
}
