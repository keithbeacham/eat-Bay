import { Text, View, StyleSheet } from "react-native";
import { Stack, Redirect, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Button from "../../components/Button";
import MapView from "react-native-maps";

export default function Index() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  function loginUser() {
    setUser((currentUser) => {
      return {
        ...currentUser,
        isLoggedIn: true,
        user_id: "sofe@northcoders.com",
        type: "customer",
      };
    });
    router.back();
  }

  function loginShop() {
    setUser((currentUser) => {
      return {
        ...currentUser,
        isLoggedIn: true,
        user_id: "marcus@northcoders.com",
        type: "shop",
      };
    });
    router.back();
  }

  function registerUser() {
    router.push("/account/Register");
  }

  return (
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
        <Text style={styles.bold30}>Login or register{"\n"}</Text>
        {user.isLoggedIn && !user.cameFromFood ? (
          <Redirect href={"/account/Account"} />
        ) : (
          <>
            <Button
              title="Press to log in as a customer"
              onPress={() => loginUser()}
            />
            <Text>{"\n"}</Text>
            <Button
              title="Press to log in as a shop"
              onPress={() => loginShop()}
            />
            <Button title="Press to register" onPress={() => registerUser()} />
          </>
        )}
      </View>
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
