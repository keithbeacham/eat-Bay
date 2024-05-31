import { View, Text, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { Stack, Redirect, useLocalSearchParams } from "expo-router";
import MapView from "react-native-maps";
import Button from "../../components/Button";
import { useEffect, useState, useContext } from "react";
import {
  getReservationsByShopId,
  patchReservationByReservationId,
} from "../../../src/api/backEndApi";
import { MapContext } from "../../contexts/MapContext";

export default function SellFood() {
  let params = {};
  const { region, setRegion } = useContext(MapContext);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shop_id, setShopId] = useState();
  const [shop_name, setShopName] = useState();

  params = useLocalSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getReservationsByShopId(params.shop_id)
      .then((reservations) => {
        setReservations(reservations);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error, " <-- error getting reservations");
      });
  }, []);

  function clearReservation(reservation_id) {
    patchReservationByReservationId(reservation_id)
      .then((response) => {
        Alert.alert("Success", "Item sold", [{ text: "OK" }]);
        const updatedReservations = [...reservations].filter(
          (reservation) => reservation.reservation_id != reservation_id
        );
        setReservations(updatedReservations);
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          "There was a problem confirming the sale of this item",
          [{ text: "OK" }]
        );
      });
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: false, headerLeft: () => (
            <View style={{ flexDirection: 'row' }} >
              <Image
                style={{ marginRight: 10 }} 
                source={require('../../../assets/logo.png')}
              />
            </View>
          ) }} />
      <MapView
        style={styles.map}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={region}
      />
      <View style={styles.pageContainer}>
        <Text style={styles.bold25}>{params.title}</Text>
        <Text>{params.address}</Text>
        <Text style={styles.bold16}>Current Reservations{"\n"}</Text>
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
                    {reservation.item_name}
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
    backgroundColor: "rgba(228,219,223,0.6)",
    padding: 5,
    marginBottom: 15,
    width: "100%",
  },
  text15: {
    fontSize: 15,
  },
  bold25: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  bold16: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
