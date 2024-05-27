import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import Button from "../../components/Button";
import MapView from "react-native-maps";
import {
  getReservationsByUserId,
  deleteReservationById,
} from "../../../src/api/backEndApi";
import { UserContext } from "../../contexts/UserContext";

export default function ViewReservations() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getReservationsByUserId(user.user_id)
      .then((reservations) => {
        setReservations(reservations);
        setIsLoading(false);
      })
  }, []);

  function deleteReservation(reservationId) {
    deleteReservationById(reservationId)
    .then(() => {
      console.log(`reservation ${reservationId} deleted`)
    })
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
      <View style={styles.pageContainer}>
        <Text style={styles.bold30}>Reserved Items{"\n"}</Text>
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
                  </Text>
                  <Text style={styles.text15}>
                    {reservation.shop_name}
                  </Text>
                  <Text style={styles.text15}>
                    {reservation.address}
                    {"\n"}
                  </Text>
                  <Text style={styles.text15}>
                    {reservation.pickup_times}
                    {"\n"}
                  </Text>
                  <Text style={styles.bold16}>Unique ID</Text>
                  <Text style={styles.text15}>
                    {reservation.reservation_id}
                    {"\n"}
                  </Text>
                  <Button
                    key={"buttonKey"}
                    title="Delete"
                    onPress={() =>
                      deleteReservation(reservation.reservation_id)
                    }
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
  container: {},
  image: {
    // flex: 1,
    width: 50,
    height: 50,
    backgroundColor: "#0553",
  },
});
