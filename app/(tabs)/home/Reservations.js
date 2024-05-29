import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import Button from "../../components/Button";
import MapView from "react-native-maps";
import {
  getReservationsByUserId,
  deleteReservationById,
} from "../../../src/api/backEndApi";
import { UserContext } from "../../contexts/UserContext";
import { MapContext } from "../../contexts/MapContext";

export default function ViewReservations() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const { region, setRegion } = useContext(MapContext);

  useEffect(() => {
    setIsLoading(true);
    getReservationsByUserId(user.user_id).then((reservations) => {
      setReservations(reservations);
      setIsLoading(false);
    });
  }, []);

  function deleteReservation(reservationId) {
    deleteReservationById(reservationId)
      .then((response) => {
        Alert.alert("Success", "Reservation deleted", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        const updatedReservations = [...reservations].filter(
          (reservation) => reservation.reservation_id != reservationId
        );
        setReservations(updatedReservations);
      })
      .catch((error) => {
        Alert.alert("Error", "There was a problem deleting the reservation", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
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
        initialRegion={region}
      />
      <View style={styles.pageContainer}>
        <Text style={styles.bold25}>Reserved Items{"\n"}</Text>
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
                  <Text style={styles.bold16}>{reservation.item_name}</Text>
                  <Text style={styles.text15}>{reservation.shop_name}</Text>
                  <Text style={styles.text12}>{reservation.address}</Text>
                  <Text style={styles.text10}>
                    {reservation.pickup_times}
                    {"\n"}
                  </Text>
                  <Text style={styles.text12}>
                    Reservation Code: {reservation.reservation_id}
                  </Text>
                  <Pressable
                    style={styles.button}
                    key={"buttonKey"}
                    onPress={() =>
                      deleteReservation(reservation.reservation_id)
                    }
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </Pressable>
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
    flexWrap: "scroll",
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
  },
  text10: {
    fontSize: 10,
    textAlign: "center",
  },
  text12: {
    fontSize: 12,
    textAlign: "center",
  },
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
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#f08080",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {},
  image: {
    // flex: 1,
    width: 50,
    height: 50,
    backgroundColor: "#0553",
  },
});
