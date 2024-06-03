import { View, StyleSheet, Alert, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  getFoodByFoodId,
  postReservation,
  patchFoodQuantity,
} from "../../../src/api/backEndApi";
import Button from "../../components/Button";
import { UserContext } from "../../contexts/UserContext";
import ScreenContainer from "../../components/ScreenContainer";
import FoodItem from "../../components/FoodItem";

export default function ViewFood() {
  const { food_id, shop_id } = useLocalSearchParams();
  const [foodItem, setFoodItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getFoodByFoodId(food_id).then((food_item) => {
      setFoodItem(food_item);
      setIsLoading(false);
    });
  }, []);

  function loginToReserve() {
    router.push("/(tabs)/account");
  }

  function reserveFoodItem() {
    if (user.isLoggedIn && user.type === "customer") {
      postReservation(shop_id, food_id, user.user_id)
        .then(() => {
          return patchFoodQuantity(food_id, -1);
        })
        .then(() => {
          Alert.alert("Success", "Reservation added", [{ text: "OK" }]);
          router.replace("/home/Reservations");
        })
        .catch((error) => {
          Alert.alert("Error", "There was a problem creating the reservation", [
            { text: "OK" },
          ]);
        });
    }
  }
  return (
    <>
      <ScreenContainer>
        <View style={styles.foodItem}>
          {isLoading ? (
            <Text>loading...</Text>
          ) : (
            <FoodItem foodItem={foodItem} />
          )}
        </View>
        {user.type === "shop" ? null : user.isLoggedIn ? (
          <Button title="Reserve Item" onPress={() => reserveFoodItem()} />
        ) : (
          <Button
            title="Log in to reserve item"
            onPress={() => loginToReserve()}
          />
        )}
      </ScreenContainer>
    </>
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
  image: {
    width: 200,
    height: 200,
  },
  foodItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "rgba(228,219,223,0.6)",
    margin: 10,
    padding: 15,
  },
});
