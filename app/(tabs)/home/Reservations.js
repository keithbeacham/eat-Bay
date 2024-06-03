import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import {
  getReservationsByUserId,
  deleteReservationById,
  patchFoodQuantity,
} from "../../../src/api/backEndApi";
import { UserContext } from "../../contexts/UserContext";
import ScreenContainer from "../../components/ScreenContainer";

export default function ViewReservations() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getReservationsByUserId(user.user_id).then((reservations) => {
      setReservations(reservations);
      setIsLoading(false);
    });
  }, []);

  function deleteReservation(reservationId, foodId) {
    deleteReservationById(reservationId, foodId)
      .then(() => {
        return patchFoodQuantity(foodId, 1);
      })
      .then((response) => {
        Alert.alert("Success", "Reservation deleted", [{ text: "OK" }]);
        const updatedReservations = [...reservations].filter(
          (reservation) => reservation.reservation_id != reservationId
        );
        setReservations(updatedReservations);
      })
      .catch((error) => {
        Alert.alert("Error", "There was a problem deleting the reservation", [
          { text: "OK" },
        ]);
      });
  }

  return (
    <>
      <ScreenContainer>
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
                  <Text style={styles.bold16}>
                    Reservation Code: {reservation.reservation_id}
                  </Text>
                  <Pressable
                    style={styles.button}
                    key={"buttonKey"}
                    onPress={() =>
                      deleteReservation(
                        reservation.reservation_id,
                        reservation.food_id
                      )
                    }
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </Pressable>
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
    margin: 10,
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
