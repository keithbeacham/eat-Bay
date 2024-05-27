import { Text, Button } from "react-native";
import { Stack, useRouter } from "expo-router";
import {
  registerForPushNotificationsAsync,
  setNotificationsHandler,
} from "../../../src/notifications";
import * as Notifications from "expo-notifications";
import { useState, useEffect, useRef } from "react";

export default function ShopHome() {
  const router = useRouter();

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

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "eatBay" }} />
      <Text>This is the User Home page, user agrees to push notifications</Text>
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
        title="agree to push notifications"
        onPress={() => setUpPushNotifications()}
      />
      <Button
        title="view current reservations"
        onPress={() => router.push("/account/SellFood")}
      />
      <Button
        title="view food list"
        onPress={() => router.push("/home/ViewFoodList").setParams("shop-id")}
      />
      <Button title="Add food" onPress={() => router.push("/home/AddFood")} />
    </>
  );
}
