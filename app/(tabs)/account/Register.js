import { Text, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useContext, useMemo, useState } from "react";
import Button from "../../components/Button";
import { UserContext } from "../../contexts/UserContext";
import { RadioGroup } from "react-native-radio-buttons-group";
import ScreenContainer from "../../components/ScreenContainer";

export default function Register() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
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
      <ScreenContainer>
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
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
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
