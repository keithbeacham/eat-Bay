import { Text, View, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getFoodByFoodId, postReservation } from "../../../src/api/backEndApi";
import generateReservationCode from "../../../src/reservationCode";
import Button from "../../components/Button";
import MapView from "react-native-maps";

export default function ViewFood() {
  const { food_id, shop_id } = useLocalSearchParams();
  const [foodItemName, setFoodItemName] = useState("");
  const [foodItemDescription, setFoodItemDescription] = useState("");
  const [foodItemQuantity, setFoodItemQuantity] = useState(0);
  const router = useRouter();
  const user_id = "barry@hotmail.com";

  useEffect(() => {
    const food_item = getFoodByFoodId(food_id);
    setFoodItemName(food_item.item_name);
    setFoodItemDescription(food_item.item_description);
    setFoodItemQuantity(food_item.quantity);
  }, []);

  function reserveFoodItem() {
    const reservationCode = generateReservationCode(food_id, user_id, shop_id);
    postReservation(shop_id, food_id, user_id, reservationCode);
    router.replace("/home/Reservations");
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
        <Text style={styles.bold30}>
          {foodItemName}
          {"\n"}
        </Text>
        <Text style={styles.text15}>
          {foodItemDescription}
          {"\n"}
        </Text>
        <Text style={styles.bold16}>
          Quantity left - {foodItemQuantity}
          {"\n"}
        </Text>
        <Button title="Reserve this Food" onPress={() => reserveFoodItem()} />
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
});
