import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="navBar" />
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
