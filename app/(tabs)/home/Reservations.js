import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import Button from "../../components/Button";
import MapView from "react-native-maps";
import {
  getFoodByFoodId,
  getReservationsByUserId,
  getShopById,
} from "../../../src/api/backEndApi";

export default function ViewReservations() {
  const user_id = 1;
  const [reservations, setReservations] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const reservationArray = [...getReservationsByUserId(user_id)];
    reservationArray.map((reservation) => {
      const reservationCopy = { ...reservation };
      const shopObject = getShopById(reservation.shop_id);
      reservationCopy.location = shopObject.address;
      reservationCopy.pickUpTimes = shopObject.pickup_times;
      const foodObject = getFoodByFoodId(reservation.food_id);
      reservationCopy.itemName = foodObject.item_name;
      return reservationCopy;
    });
    console.log(reservationArray);

    setReservations(reservationArray);
  }, []);
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
        <Text style={styles.bold30}>Reserved Items{"\n"}</Text>
        <Text style={styles.bold16}>Item Name{"\n"}</Text>
        <Text style={styles.text15}>Location{"\n"}</Text>
        <Text style={styles.text15}>Pick Up Times{"\n"}</Text>
        <Text style={styles.bold16}>Unique ID{"\n"}</Text>

        <Button title="Delete" />
        {/* <Button
          title="go back to food list"
          onPress={() => router.replace("/home/ViewFoodList")}
        /> */}
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
  foodItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text15: {
    fontSize: 15,
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
  container: {},
  image: {
    // flex: 1,
    width: 50,
    height: 50,
    backgroundColor: "#0553",
  },
});
