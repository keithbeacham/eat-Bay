import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import { Stack, Link, useLocalSearchParams, useRouter } from "expo-router";
import MapView from "react-native-maps";
import {
  getFollowersByShopId,
  getFoodByShopId,
} from "../../../src/api/backEndApi";
import { UserContext } from "../../contexts/UserContext";
import LikeButton from "../../components/LikeButton";
import { MapContext } from "../../contexts/MapContext";

//import { Image } from "expo-image";

export default function ViewFood() {
  let params = {};
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [pickUpTimes, setPickUpTimes] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [likeButtonSelected, setLikeButtonSelected] = useState(false);
  const router = useRouter();
  const { region, setRegion } = useContext(MapContext);

  params = useLocalSearchParams();
  useEffect(() => {
    setShopName(params.title);
    setAddress(params.address);
    setPickUpTimes(params.pickUpTimes);
    setIsLoading(true);
    getFoodByShopId(params.shop_id).then((foods) => {
      setFoodItems(foods);
      setIsLoading(false);
    });
    getFollowersByShopId(params.shop_id).then((response) => {
      response.forEach((follower) => {
        if (follower.user_id === user.user_id) {
          setLikeButtonSelected(true);
        }
      });
    });
  }, []);

  function userLikesShop() {
    // PATCH user and PATCH shop
    setLikeButtonSelected(!likeButtonSelected);
    if (likeButtonSelected) {
      getUserById(user.user_id)
        .then((response) => {
          return response.pushToken;
        })
        .then((pushToken) => {
          postFollowers(user.user_id, params.shop_id, pushToken);
        })
        .then(() => {
          Alert.alert(
            "Success",
            "You will now receive updates from this shop!",
            [{ text: "OK" }]
          );
        })
        .catch((err) => {
          Alert.alert("Oops", "Something went wrong, please try again later", [
            { text: "OK" },
          ]);
          setLikeButtonSelected(false);
        });
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: false,
          headerLeft: () => (
            <View style={{flexDirection:'row'}} >
            <Image
            style={{marginRight:10}}
            //source={{uri:"https://7hillsfood.co.uk/7hills/img/logo.png?v=20240521-0424"}} 
            source={require('../../../assets/logo.png')}
             />
             </View>
            )
        }}
      />
      <MapView
        style={styles.map}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={region}
      />
      <View style={styles.pageContainer}>
        <View style={styles.likeButton}>
          <LikeButton
            onChange={() => userLikesShop()}
            selected={likeButtonSelected}
          />
        </View>
        <Text style={styles.shopName}>{shopName}</Text>
        <Text>{address}</Text>
        <Text style={styles.text12}>
          {pickUpTimes}
          {"\n"}
        </Text>
        <ScrollView>
          {isLoading ? (
            <Text>Loading Data...</Text>
          ) : (
            foodItems.map((foodItem) => {
              return (
                <Link
                  key={foodItem.food_id}
                  href={{
                    pathname: `/home/ViewFood`,
                    params: {
                      food_id: foodItem.food_id,
                      shop_id: params.shop_id,
                    },
                  }}
                  style={styles.foodItem}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: foodItem.picture_url }}
                      style={styles.image}
                    />
                  </View>
                  <Text>{"\n"}</Text>
                  <Text style={styles.bold20}>
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
                </Link>
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
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 10,
    borderRadius: 10,
  },
  shopName: {
    fontWeight: "bold",
    fontSize: 25,
    marginRight: 20,
    textAlign: "center",
  },
  likeButton: {
    position: "absolute",
    top: "2%",
    right: "5%",
  },
  foodItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(228,219,223,0.8)",
    margin: 10,
    padding: 15,
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
  bold20: {
    fontWeight: "bold",
    fontSize: 20,
  },
  bold16: {
    fontWeight: "bold",
    fontSize: 16,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
  },
  listContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
