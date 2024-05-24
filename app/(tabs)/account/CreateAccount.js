import { Text, Button } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function Account() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "eatBay" }} />
      <Text>
        This is the Create Account page, user selects whether they are a shop or
        a user
      </Text>
      <Button
        title="create account (customer)"
        onPress={() => router.push("/account/UserHome")}
      />
      <Button
        title="create account (shop)"
        onPress={() => router.push("/account/ShopHome")}
      />
    </>
  );
}
