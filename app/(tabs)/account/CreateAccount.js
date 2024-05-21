import { Text, Button } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function Account() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{ headerShown: true, title: "Account" }}
      />
      <Text>
        This is the Create Account page, user selects whether they are a shop or
        a user
      </Text>
      <Button
        title="create account (customer)"
        onPress={() => router.replace("/account/UserHome")}
      />
      <Button
        title="create account (shop)"
        onPress={() => router.replace("/account/ShopHome")}
      />
    </>
  );
}
