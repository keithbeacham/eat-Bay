import { View, StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";

import { Stack, Link } from "expo-router";

export default function Home() {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack.Screen options={{ headerShown: false }} />
        <MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} />
        <Link href={"/home/ViewFoodList"}>
          <Text>Press to go to View food list</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "95%",
  },
});
