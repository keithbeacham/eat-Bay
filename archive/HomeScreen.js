import { useState, useEffect, useRef } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import MapView from "react-native-maps";
import {
  sendPushNotification,
  registerForPushNotificationsAsync,
  setNotificationsHandler,
} from "../src/notifications";
import NavBar from "../app/navBar";

export default function HomePage() {
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

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NavBar />
        <MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} />

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
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "90%",
  },
});
