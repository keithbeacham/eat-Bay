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
    setUser({
      isLoggedIn: true,
      user_id: "sofe@northcoders.com",
      type: "customer",
    });
    router.back();
  }

  function loginShop() {
    setUser({
      isLoggedIn: true,
      user_id: "amanda@northcoders.com",
      type: "shop",
      users_shop_id: 9
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
        {user.isLoggedIn ? (
          user.type === "customer" ? (
            <Redirect href={"/account/UserHome"} />
          ) : (
            <Redirect href={"/account/ShopHome"} />
          )
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
            <Text>{"\n"}</Text>
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
