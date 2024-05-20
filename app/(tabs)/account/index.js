import { Button, Text } from "react-native";
import { Stack, Redirect } from "expo-router";
import { useState } from "react";

export default function LoginUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{ headerShown: true, title: "Login" }}
      />
      <Text>This is the login account page</Text>
      {isLoggedIn ? (
        <Redirect href={"/account/Account"} />
      ) : (
        <Button
          title="Press to log in"
          onPress={() => {
            setIsLoggedIn(true);
          }}
        />
      )}
    </>
  );
}
