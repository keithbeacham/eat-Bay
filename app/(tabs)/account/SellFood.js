import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack, Redirect } from "expo-router";
import MapView from "react-native-maps";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import {
  getReservationsByShopId,
  getFoodByFoodId,
  patchReservationByReservationId,
} from "../../../src/api/backEndApi";

export default function SellFood() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadData, setReloadData] = useState(Date.now());
  const shop_id = 2;

  useEffect(() => {
    setIsLoading(true);
    const reservationArrayCopy = [...getReservationsByShopId(shop_id)];
    const reservationArray = reservationArrayCopy.map((reservation) => {
      const reservationCopy = { ...reservation };
      const foodObject = getFoodByFoodId(reservation.food_id);
      reservationCopy.itemName = foodObject.item_name;
      return reservationCopy;
    });
    setReservations(reservationArray);
    setIsLoading(false);
  }, [reloadData]);

  function clearReservation(transaction_id) {
    patchReservationByReservationId(transaction_id);
    setReloadData(Date.now());
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "eatBay" }} />
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
        <Text style={styles.bold30}>Current Reservations{"\n"}</Text>
        <ScrollView>
          {isLoading ? (
            <Text>Loading Data...</Text>
          ) : (
            reservations.map((reservation) => {
              return (
                <View
                  key={reservation.transaction_id}
                  style={styles.reservationBox}
                >
                  <Text style={styles.bold16}>
                    {reservation.itemName}
                    {"\n"}
                  </Text>
                  <Text style={styles.text15}>
                    {reservation.user_id}
                    {"\n"}
                  </Text>
                  <Text style={styles.bold16}>
                    {reservation.reservation_code}
                    {"\n"}
                  </Text>
                  <Button
                    title="Sold"
                    onPress={() => clearReservation(reservation.transaction_id)}
                  />
                </View>
              );
            })
          )}
        </ScrollView>
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
  reservationBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(228,219,223,0.8)",
    margin: 10,
    padding: 5,
    width: "100%",
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
});
