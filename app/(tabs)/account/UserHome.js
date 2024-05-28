import { Text, View, StyleSheet, TextInput, Alert } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { useContext } from "react";
import {
  registerForPushNotificationsAsync,
  setNotificationsHandler,
} from "../../../src/notifications";
import { UserContext } from "../../contexts/UserContext";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import MapView from "react-native-maps";
import * as Notifications from "expo-notifications";
import { useState, useEffect, useRef } from "react";

export default function UserHome() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(Notifications.Notification);
  const notificationListener = useRef(Notifications.Subscription);
  const responseListener = useRef(Notifications.Subscription);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [allowNotifications, setAllowNotifications] = useState(false);

  function setUpPushNotifications() {
    console.log("set up push notifications");
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
    console.log(expoPushToken);
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
    // PATCH user
    setUser({
      user_id: userId,
      type: "customer",
      isLoggedIn: true,
    });
    if (allowNotifications) {
      setUpPushNotifications();
    }
    Alert.alert("Success", "Your details have been updated", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
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
      {!user.isLoggedIn ? (
        <Redirect href={"/account"} />
      ) : (
        <View style={styles.pageContainer}>
          <Text style={styles.bold30}>Home Page</Text>
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
            placeholder={"name"}
            autoCorrect={false}
          />
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => updateEmail(text)}
            value={userId}
            placeholder={"change email"}
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
            />
            <Text style={styles.checkboxText}>
              I want my favourite shops to send me push notifications
            </Text>
          </View>
          <Button title="Update" onPress={() => updateUserDetails()} />
          <Text style={{ fontSize: 5 }}>{"\n"}</Text>
          <Button
            title="view reservations"
            onPress={() => router.replace("/home/Reservations")}
          />
          <Text style={{ fontSize: 5 }}>{"\n"}</Text>
          <Button title="log out" onPress={() => logoutUser()} />
        </View>
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
  checkboxContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 40,
    marginTop: 10,
  },
  checkboxText: {
    fontsize: 16,
    marginLeft: 10,
    marginRight: 40,
  },
});
