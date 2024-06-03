import { Text, StyleSheet, Alert, Image } from "react-native";
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

export default function ViewFood() {
  const { food_id, shop_id } = useLocalSearchParams();
  const [foodItemName, setFoodItemName] = useState("");
  const [foodItemDescription, setFoodItemDescription] = useState("");
  const [foodItemQuantity, setFoodItemQuantity] = useState(0);
  const [foodPictureUrl, setFoodPictureUrl] = useState();
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    getFoodByFoodId(food_id).then((food_item) => {
      setFoodItemName(food_item.item_name);
      setFoodItemDescription(food_item.item_description);
      setFoodItemQuantity(food_item.quantity);
      setFoodPictureUrl(food_item.picture_url);
    });
  }, []);

  function loginToReserve() {
    setUser((currentUser) => {
      return { ...currentUser, cameFromFood: true };
    });
    router.push("/(tabs)/account");
  }

  function reserveFoodItem() {
    if (user.isLoggedIn && user.type === "customer") {
      postReservation(shop_id, food_id, user.user_id)
        .then(() => {
          return patchFoodQuantity(food_id, -1);
        })
        .then(() => {
          Alert.alert("Success", "Reservation added", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          router.replace("/home/Reservations");
        })
        .catch((error) => {
          Alert.alert("Error", "There was a problem creating the reservation", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        });
    }
  }
  return (
    <>
      <ScreenContainer>
        <Image source={{ uri: foodPictureUrl }} style={styles.image} />
        <Text style={styles.bold25}>
          {foodItemName}
          {"\n"}
        </Text>
        <Text style={styles.text15}>
          {foodItemDescription}
          {"\n"}
        </Text>
        <Text style={styles.bold16}>
          {foodItemQuantity} remaining
          {"\n"}
        </Text>
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
});
