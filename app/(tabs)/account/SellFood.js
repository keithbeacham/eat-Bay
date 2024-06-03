import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import {
  getReservationsByShopId,
  patchReservationByReservationId,
} from "../../../src/api/backEndApi";
import ScreenContainer from "../../components/ScreenContainer";

export default function SellFood() {
  let params = {};
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <ScreenContainer>
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
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
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
