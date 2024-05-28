import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image, ScrollView} from "react-native";
import { Stack, Link, useLocalSearchParams, useRouter } from "expo-router";
import MapView from "react-native-maps";
import { getFoodByShopId } from "../../../src/api/backEndApi";
import { UserContext } from "../../contexts/UserContext";

//import { Image } from "expo-image";

export default function ViewFood() {
  let params = {};
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [pickUpTimes, setPickUpTimes] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  params = useLocalSearchParams();
  useEffect(() => {
    setShopName(params.title);
    setAddress(params.address);
    setPickUpTimes(params.pickUpTimes);
    getFoodByShopId(params.shop_id).then((foods) => {
      setFoodItems(foods);
      foodItems.forEach((food) => {
        console.log("picture url:", food.picture_url);
      });
    });
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "eatBay",
        }}
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
        <Text style={styles.bold25}>{shopName}</Text>
        <Text>{address}</Text>
        <Text style={styles.text12}>{pickUpTimes}</Text>
        <ScrollView style={styles.listContainer}>

        {foodItems.map((foodItem, index) => {
          return (
            <Link
            key={index}
            href={{
                pathname: `/home/ViewFood`,
                params: { food_id: foodItem.food_id, shop_id: params.shop_id },
              }}
              style={styles.foodItem}
              >
              <View style={styles.foodItem}>

              <Image
                source={{ uri: foodItem.picture_url }}
                style={styles.image}
                />
              <Text>
                {"\n"}
              </Text>
              <Text style={styles.bold16}>
                {"\n"}
                {foodItem.item_name}
              </Text>
              <Text style={styles.text15}>
                {"\n"}
                {foodItem.item_description}
              </Text>
              <Text style={styles.bold16}>
                {"\n"}
                {foodItem.quantity} available
              </Text>
                </View>
            </Link>
          );
        })}
        </ScrollView>
        <Button
          title="Add Item (if you are a shop)"
          onPress={() => {
            router.replace("/home/AddFood");
          }}
        />
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
  foodItem: {
    flex: 1,
    alignItems: "center",
  },
  text12: {
    fontSize: 12,
  },
  text15: {
    fontSize: 15,
  },
  bold25: {
    fontWeight: "bold",
    fontSize: 25,
  },
  bold16: {
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {},
  image: {
    flex: 1,
    width: 200,
    height: 200,
    backgroundColor: "#0553",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
