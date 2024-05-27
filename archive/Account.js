import { Text, View, StyleSheet } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { useContext } from "react";
import Button from "../app/components/Button";
import MapView from "react-native-maps";
import { UserContext } from "../app/contexts/UserContext";

export default function Account() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  function logoutUser() {
    setUser({
      user_id: "",
      type: "customer",
      isLoggedIn: false,
    });
    router.push("/home");
  }
  return (
    <>
      {!user.isLoggedIn ? (
        <>
          <Stack.Screen
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            options={{ headerShown: true, title: "eatBay" }}
          />
          <MapView
            style={styles.map}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 50.95,
              longitude: -1.4,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15,
            }}
          />
          <View style={styles.pageContainer}>
            <Text>
              This is the Register or Home account page, user selects whether
              they are a shop or a user
            </Text>
            {/* <Button
        title="Register"
        onPress={() => router.push("/account/UserHome")}
      />
      <Button
        title="create account (shop)"
        onPress={() => router.push("/account/ShopHome")}
      /> */}
            <Button title="log out" onPress={() => logoutUser()} />
          </View>
        </>
      ) : (
        <Redirect href={"/(tabs)/account"} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  pageContainer: {
    position: "absolute",
    top: "5%",
    left: "10%",
    width: "80%",
    height: "90%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 10,
    borderRadius: 10,
  },
  text15: {
    fontSize: 15,
    textAlign: "center",
  },
  bold30: {
    fontWeight: "bold",
    fontSize: 30,
  },
  bold16: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
