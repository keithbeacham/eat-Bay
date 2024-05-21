import { Text, View, Button } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function ViewFood() {
  const { FoodItemId } = useLocalSearchParams();
  const router = useRouter();

  return (
    <>
      <View>
        <Stack.Screen
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
        <Text>This is the "view food item" screen for item {FoodItemId}</Text>
        <Button
          title="buy this food"
          onPress={() => router.replace("/home/Transactions")}
        />
      </View>
    </>
  );
}
