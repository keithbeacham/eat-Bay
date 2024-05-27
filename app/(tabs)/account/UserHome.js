import { Text, View, StyleSheet } from "react-native";
import { Redirect, Stack, useRouter } from "expo-router";
import { useContext } from "react";
import {
  registerForPushNotificationsAsync,
  setNotificationsHandler,
} from "../../../src/notifications";
import { UserContext } from "../../contexts/UserContext";
import Button from "../../components/Button";
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

  useEffect(() => {
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
  }, []);

  function setUpPushNotifications() {
    console.log(expoPushToken);
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
          <Text>This is the User Home page</Text>
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
          <Button
            title="agree to send notifications"
            onPress={() => setUpPushNotifications()}
          />
          <Text>{"\n"}</Text>
          <Button
            title="view reservations"
            onPress={() => router.replace("/home/Transactions")}
          />
          <Text>{"\n"}</Text>
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
