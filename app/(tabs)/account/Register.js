import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { useContext, useMemo, useState } from "react";
import Button from "../../components/Button";
import MapView from "react-native-maps";
import { UserContext } from "../../contexts/UserContext";
import { MapContext } from "../../contexts/MapContext";
import { RadioGroup } from "react-native-radio-buttons-group";

export default function Register() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { region, setRegion } = useContext(MapContext);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");
  const [userTypeId, setUserTypeId] = useState("customer");

  const radioButtons = useMemo(
    () => [
      {
        id: "customer",
        label: "customer",
        value: "customer",
      },
      {
        id: "shop",
        label: "shop",
        value: "shop",
      },
    ],
    []
  );

  function updateUserName(text) {
    setUserName(text);
  }
  function updateUserId(text) {
    setUserId(text);
  }
  function updatePassword(text) {
    setPassword(text);
  }
  function updatePasswordCopy(text) {
    setPasswordCopy(text);
  }
  function setUserType(typeId) {
    setUserTypeId(typeId);
  }
  function createAccount() {
    // POST new user
    setUser({
      user_id: userId,
      type: userTypeId,
      isLoggedIn: true,
      users_shop_id: 9,
    });
    if (userTypeId === "customer") {
      router.replace("/account/UserHome");
    } else {
      router.replace("/account/ShopHome");
    }
  }

  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{ headerShown: true, title: false, headerLeft: () => (
          <View style={{ flexDirection: 'row' }} >
            <Image
              style={{ marginRight: 10 }} 
              source={require('../../../assets/logo.png')}
            />
          </View>
        ) }}
      />
      <MapView
        style={styles.map}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={region}
      />
      <View style={styles.pageContainer}>
        <Text style={styles.bold30}>Register</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={(id) => setUserType(id)}
          selectedId={userTypeId}
          layout="row"
        />
        <Text style={{ fontSize: 5 }}>{"\n"}</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => updateUserName(text)}
          value={userName}
          placeholder={"name"}
          autoCorrect={false}
        />
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
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => updatePasswordCopy(text)}
          value={passwordCopy}
          placeholder={"re-enter password"}
          secureTextEntry={true}
        />
        <Button title="Create Account" onPress={() => createAccount()} />
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
