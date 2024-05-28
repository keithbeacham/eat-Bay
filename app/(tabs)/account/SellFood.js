import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
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
  const shop_id = 9;

  useEffect(() => {
    setIsLoading(true);
    getReservationsByShopId(shop_id)
    .then((reservations) => {
      //waiting for endpoint update to have food item name included
      setReservations(reservations);
      setIsLoading(false);
    })
  }, []);

  function clearReservation(reservation_id) {
    patchReservationByReservationId(reservation_id)
    .then((response) => {
      Alert.alert('Success', 'Item sold', [
        {text: 'OK'},])
        const updatedReservations = [...reservations].filter((reservation) => reservation.reservation_id != reservation_id)
        setReservations(updatedReservations) 
    })
    .catch(error => {
      Alert.alert('Error', 'There was a problem confirming the sale of this item', [
        {text: 'OK'},])
  })
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
        <Text style={styles.bold25}>Current Reservations{"\n"}</Text>
        <ScrollView>
          {isLoading ? (
            <Text>Loading Data...</Text>
          ) : (
            reservations.map((reservation) => {
              return (
                <View
                  key={reservation.reservation_id}
                  style={styles.reservationBox}
                >
                  <Text style={styles.bold16}>
                  {"Item Name (waiting BE)"}
                    {/*reservation.itemName*/}
                    {"\n"}
                  </Text>
                  <Text style={styles.text15}>
                    Reserved by: {reservation.user_id}
                    {"\n"}
                  </Text>
                  <Text style={styles.bold16}>
                    Reservation code: {reservation.reservation_id}
                    {"\n"}
                  </Text>
                  <Button
                    title="Sold"
                    onPress={() => clearReservation(reservation.reservation_id)}
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
  bold25: {
    fontWeight: "bold",
    fontSize: 25,
  },
  bold16: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
