import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Stack, Link, useLocalSearchParams, useRouter } from "expo-router";
import MapView from "react-native-maps";
import { getFoodByShopId } from "../../../src/api/backEndApi";
import { Image } from "expo-image";

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
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Food Available",
          }}
        />

        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}>
          {shopName}
        </Text>
        <Text>{address}</Text>
        <Text style={{ textAlign: "center" }}>{pickUpTimes}</Text>
        <View style={styles.listContainer}>
          {foodItems.map((foodItem, index) => {
            return (
              <Link key={index} href={`/home/${foodItem.food_id}`}>
                {/* <View
                  style={{
                    // textAlign: "center",
                    // flex: 1,
                    // flexWrap: "wrap",
                    backgroundColor: "white",
                    // justifyContent: "center",
                    // alignItems: "center",
                    // marginTop: "10",
                    // width: "100%",
                  }}
                > */}
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Name:{foodItem.item_name}
                  {"\n"}
                </Text>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={styles.image}
                    // contentFit="cover"
                    source="https://picsum.photos/seed/696/3000/2000"
                    // source="https://images.app.goo.gl/iRhwkXD7cPJqE8HN7"
                  />
                </View>

                <View
                  style={
                    {
                      // flex: 1,
                      // justifyContent: "center",
                      // alignItems: "center",
                      // overflow: "auto",
                    }
                  }
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Description */}
                    Description:{foodItem.item_description}
                    {"\n"}
                  </Text>
                </View>

                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Quantity Available:{foodItem.quantity}
                </Text>
                {/* </View> */}
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
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "95%",
  },
  image: { width: "100%", flex: 1, resizeMode: "cover" },
  overlay: {
    position: "absolute",
    top: "5%",
    left: "10%",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "90%",
    backgroundColor: "rgba(197, 197, 197, 0.9)",
    // borderRadius: "10",
  },
  listContainer: {
    overflow: "scroll",
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "80%",
    backgroundColor: "blue",
  },
});
