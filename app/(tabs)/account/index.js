import { Text, StyleSheet, TextInput } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Button from "../../components/Button";
import ScreenContainer from "../../components/ScreenContainer";

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
        name: "Sofe",
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
      <ScreenContainer>
        <Text style={styles.bold25}>Login or Register{"\n"}</Text>
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
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  text15: {
    fontSize: 15,
    textAlign: "center",
  },
  bold25: {
    fontWeight: "bold",
    fontSize: 25,
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
