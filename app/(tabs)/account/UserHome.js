import { Text, View, StyleSheet, TextInput, Alert, Image } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { useContext } from "react";
import {
  registerForPushNotificationsAsync,
  setNotificationsHandler,
} from "../../../src/notifications";
import { UserContext } from "../../contexts/UserContext";
import { MapContext } from "../../contexts/MapContext";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import MapView from "react-native-maps";
import * as Notifications from "expo-notifications";
import { useState, useEffect, useRef } from "react";
import { patchUserById } from "../../../src/api/backEndApi";
import ScreenContainer from "../../components/ScreenContainer";

export default function UserHome() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { region, setRegion } = useContext(MapContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(Notifications.Notification);
  const notificationListener = useRef(Notifications.Subscription);
  const responseListener = useRef(Notifications.Subscription);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [allowNotifications, setAllowNotifications] = useState(false);

  useEffect(() => {
    setUpPushNotifications();
  }, []);

  function setUpPushNotifications() {
    setNotificationsHandler();
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }

  function updateUserName(text) {
    setUserName(text);
  }
  function updateEmail(text) {
    setUserId(text);
  }
  function updatePassword(text) {
    setPassword(text);
  }

  function updateUserDetails() {
    if (!allowNotifications) {
      setExpoPushToken("");
    }
    const body = {};
    if (expoPushToken) {
      body.push_token = expoPushToken;
    }
    if (userName) {
      body.name = userName;
    }
    if (password) {
      body.password = password;
    }
    patchUserById(user.user_id, body)
      .then(() => {
        Alert.alert("Success", "Your details have been updated", [
          { text: "OK" },
        ]);
      })
      .catch((err) => {
        Alert.alert(
          "Oops",
          "Something has gone wrong, please try again later",
          [{ text: "OK" }]
        );
      });
  }

  function logoutUser() {
    setUser({
      user_id: "",
      type: "customer",
      isLoggedIn: false,
    });
    router.push("/home");
  }

  return (
    <ScreenContainer>
      {!user.isLoggedIn ? (
        <Redirect href={"/account"} />
      ) : (
        <>
          <Text style={styles.bold25}>Account</Text>
          <Text></Text>
          {/* <Text>Your Expo push token: {expoPushToken}</Text> */}
          {/* <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View> */}
          {/* <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        /> */}
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => updateUserName(text)}
            value={userName}
            placeholder={user.name}
            autoCorrect={false}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => updateEmail(text)}
            value={userId}
            placeholder={user.user_id}
            autoCorrect={false}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => updatePassword(text)}
            value={password}
            placeholder={"change password"}
            secureTextEntry={true}
          />
          <View style={styles.checkboxContainer}>
            <Checkbox
              onChange={() => setAllowNotifications(!allowNotifications)}
              checked={allowNotifications}
              style={{ marginTop: 5 }}
            />
            <Text style={styles.checkboxText}>
              I want my favourite shops to send me push notifications
            </Text>
          </View>
          <Button title="Update" onPress={() => updateUserDetails()} />
          <Text style={{ fontSize: 5 }}>{"\n"}</Text>
          <Button
            title="View Reservations"
            onPress={() => router.replace("/home/Reservations")}
          />
          <Text style={{ fontSize: 5 }}>{"\n"}</Text>
          <Button title="Log Out" onPress={() => logoutUser()} />
        </>
      )}
    </ScreenContainer>
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
    // flexDirection: "row",
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
    marginBottom: 10,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 40,
    marginRight: 40,
  },
  checkboxText: {
    fontsize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
});
