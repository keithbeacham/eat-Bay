import { Text, View } from "react-native";
import { Stack } from "expo-router";

export default function AboutUs() {
  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{ headerShown: true, title: "About us" }}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ margin: 30 }}>
          A long time ago in a galaxy far, far away Luke Skywalker has returned
          to his home planet of Tatooine in an attempt to rescue his friend Han
          Solo from a shortage of affordable food. Little does Luke know that
          the GALACTIC FOOD INDUSTRY wastes 40% of the food it produces. With
          the help of the REBEL FOOD ALLIANCE Luke works on a secret weapon to
          free the Galaxy from the tyranny of wasted food. When completed, this
          ultimate tool - EATBAY - will restore freedom to the galaxy...
        </Text>
      </View>
    </>
  );
}
