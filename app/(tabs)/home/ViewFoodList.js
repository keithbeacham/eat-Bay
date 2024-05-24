import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { Stack, Link, useLocalSearchParams, useRouter } from "expo-router";
import MapView from "react-native-maps";
import { getFoodByShopId } from "../../../src/api/backEndApi";
//import { Image } from "expo-image";

export default function ViewFood() {
  let params = {};
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [pickUpTimes, setPickUpTimes] = useState("");
  const [foodItems, setFoodItems] = useState([]);

  params = useLocalSearchParams();
  useEffect(() => {
    setShopName(params.title);
    setAddress(params.address);
    setPickUpTimes(params.pickUpTimes);
    setFoodItems(getFoodByShopId(params.shop_id));
  }, []);

  const router = useRouter();

  return (
    <>
      {/* <MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} /> */}
      <View
        style={{
          position: "absolute",
          top: "5%",
          left: "10%",
          width: "80%",
          height: "90%",
        }}
      >
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Food Available",
          }}
        />
        <View style={{ alignItems: "center", flex: 1}}>
          <Text style={styles.bold30}>
            {shopName}
          </Text>
          <Text>{address}</Text>
          <Text>{pickUpTimes}</Text>
          {foodItems.map((foodItem, index) => {
            return (
              <Link key={index} href={`/home/${foodItem.food_id}`}>
                <Image source={{uri: 'https://reactjs.org/logo-og.png'}} style={styles.image}/>
                <Text
                  style={styles.bold16}
                >
                  {"\n"}
                  Name: {foodItem.item_name}
                </Text>
                <Text
                  style={styles.text}
                >
                  {"\n"}
                  Description: {foodItem.item_description}
                </Text>
                <Text
                  style={styles.bold16}
                >
                  {"\n"}
                  Quantity Available:{foodItem.quantity}
                </Text>

              </Link>
            );
          })}
        </View>

        <Link href={"/home/food-item-16"}>
          <Text>click here to go to the food item page</Text>
        </Link>
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
  text: {
    fontSize: 15
  },
  bold30: {
    fontWeight: "bold",
    fontSize: 30,
  },
  bold16: {
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
  },
  map: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "95%",
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#0553',
  }

});
