import { Text, View, StyleSheet, TextInput } from "react-native";
import { Stack, Redirect, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Button from "../../components/Button";
import MapView from "react-native-maps";

export default function Index() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  function updateUserId(text) {
    setUserId(text);
  }

  function updatePassword(text) {
    setPassword(text);
  }

  function loginUser() {
    if (userId === "sofe@northcoders.com" || userId === "user") {
      setUser({
        isLoggedIn: true,
        user_id: "sofe@northcoders.com",
        type: "customer",
      });
    } else {
      setUser({
        isLoggedIn: true,
        user_id: "amanda@northcoders.com",
        type: "shop",
        users_shop_id: 9,
      });
    }
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
        <Text style={styles.bold30}>Login or Register{"\n"}</Text>
        {user.isLoggedIn ? (
          user.type === "customer" ? (
            <Redirect href={"/account/UserHome"} />
          ) : (
            <Redirect href={"/account/ShopHome"} />
          )
        ) : (
          <>
            <TextInput
              style={styles.inputBox}
              onChangeText={(text) => updateUserId(text)}
              value={userId}
              placeholder={"email"}
              autoCorrect={false}
            />
            <TextInput
              style={styles.inputBox}
              onChangeText={(text) => updatePassword(text)}
              value={password}
              placeholder={"password"}
              secureTextEntry={true}
            />
            <Button title="  Log In  " onPress={() => loginUser()} />
            <Text>
              {"\n"}
              {"\n"}
            </Text>
            <Button title="Register" onPress={() => registerUser()} />
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
  inputBox: {
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    width: "70%",
    marginBottom: 15,
  },
});
