import { Text, View, StyleSheet, Alert, Image } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { getFoodByFoodId, postReservation } from "../../../src/api/backEndApi";
import Button from "../../components/Button";
import MapView from "react-native-maps";
import { UserContext } from "../../contexts/UserContext";
import { MapContext } from "../../contexts/MapContext";

export default function EditFood() {
  const { food_id, shop_id } = useLocalSearchParams();
  const [foodItemName, setFoodItemName] = useState("");
  const [foodItemDescription, setFoodItemDescription] = useState("");
  const [foodItemQuantity, setFoodItemQuantity] = useState(0);
  const [foodPictureUrl, setFoodPictureUrl] = useState();
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { region, setRegion } = useContext(MapContext);

  useEffect(() => {
    getFoodByFoodId(food_id).then((food_item) => {
      setFoodItemName(food_item.item_name);
      setFoodItemDescription(food_item.item_description);
      setFoodItemQuantity(food_item.quantity);
      setFoodPictureUrl(food_item.picture_url);
    });
  }, []);

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
        <Text style={styles.bold30}>Edit Food Item {"\n"}</Text>
        <Image source={{ uri: foodPictureUrl }} style={styles.image} />
        <Text style={styles.bold20}>
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
        <Button title={"  Edit  "} />
        <Button title={"Delete"} />
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
  bold20: {
    fontWeight: "bold",
    fontSize: 20,
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
