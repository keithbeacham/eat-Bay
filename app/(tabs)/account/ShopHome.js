import { Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { Redirect, useRouter, Link } from "expo-router";
import {
  registerForPushNotificationsAsync,
  setNotificationsHandler,
} from "../../../src/notifications";

import Button from "../../components/Button";
import * as Notifications from "expo-notifications";
import { useState, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getShopById } from "../../../src/api/backEndApi";
import ScreenContainer from "../../components/ScreenContainer";

export default function ShopHome() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(Notifications.Notification);
  const notificationListener = useRef(Notifications.Subscription);
  const responseListener = useRef(Notifications.Subscription);
  const [shop, setShop] = useState({});

  useEffect(() => {
    getShopById(user.users_shop_id)
      .then((shop) => {
        setShop(shop);
      })
      .catch((error) => console.log(error, " <-- getShopById error"));
  }, []);

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
    <ScreenContainer>
      {!user.isLoggedIn ? (
        <Redirect href={"/account"} />
      ) : (
        <>
          <Text style={styles.bold25}>{shop.shop_name}</Text>
          <Text style={styles.text16}>
            {shop.address}
            {"\n"}
          </Text>
          <Text>{"\n"}</Text>
          <Link
            style={styles.button}
            href={{
              pathname: "/account/SellFood",
              params: {
                shop_id: user.users_shop_id,
                title: shop.shop_name,
                address: shop.address,
              },
            }}
          >
            <Text style={styles.buttonText}>View Reservations</Text>
          </Link>
          <Text>{"\n"}</Text>
          <Link
            style={styles.button}
            href={{
              pathname: "/home/ViewFoodList",
              params: {
                shop_id: user.users_shop_id,
                title: shop.shop_name,
                address: shop.address,
              },
            }}
          >
            <Text style={styles.buttonText}>View Food List</Text>
          </Link>
          <Text>{"\n"}</Text>
          {
            <Button
              title="Add Food"
              onPress={() =>
                router.push({ pathname: "/home/AddFood", params: shop })
              }
            />
          }
          <Text>{"\n"}</Text>
          <Button title="Log Out" onPress={() => logoutUser()} />
        </>
      )}
    </ScreenContainer>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "rgba(45,200,175,1)",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
