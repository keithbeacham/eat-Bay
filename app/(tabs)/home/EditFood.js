import { Text, View, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getFoodByFoodId, deleteFoodById } from "../../../src/api/backEndApi";
import Button from "../../components/Button";
import ScreenContainer from "../../components/ScreenContainer";
import FoodItem from "../../components/FoodItem";

export default function EditFood() {
  const { food_id, shop_id } = useLocalSearchParams();
  const [foodItem, setFoodItem] = useState({});
  const router = useRouter();

  useEffect(() => {
    getFoodByFoodId(food_id).then((food_item) => {
      setFoodItem(food_item);
    });
  }, []);

  function deleteFoodItem() {
    deleteFoodById(food_id)
      .then(() => {
        router.replace("/account");
      })
      .then(() => {
        Alert.alert("Success", "Food item was deleted", [{ text: "OK" }]);
      })
      .catch((error) => {
        Alert.alert("Error", "There was a problem deleting the food item", [
          { text: "OK" },
        ]);
      });
  }

  function editFoodItem() {
    router.push({
      pathname: "/home/EditFood",
      params: {
        food_id: food_id,
        shop_id: shop_id,
      },
    });
  }
  return (
      <ScreenContainer>
        <Text style={styles.bold25}>Edit Food Item {"\n"}</Text>

        <FoodItem foodItem={foodItem} />
        <View style={styles.shopButtons}>
          <Button
            style={{ margin: 10 }}
            title={"Delete"}
            onPress={() => deleteFoodItem()}
          />
          <Button
            style={{ margin: 10 }}
            title={"  Edit  "}
            onPress={() => editFoodItem()}
          />
        </View>
      </ScreenContainer>
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
  shopButtons: {
    flex: 1,
    width: "80%",
    flexDirection: "row",
    alignItems: "space-between",
  },
});
