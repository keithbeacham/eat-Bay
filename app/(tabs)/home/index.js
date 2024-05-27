import { View, StyleSheet, TextInput } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getLocation } from "../../../src/api/mapApi";
import { getShops } from "../../../src/api/backEndApi";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [latitude, setLatitude] = useState(54.093);
  const [longitude, setLongitude] = useState(-2.895);
  const [latitudeDelta, setLatitudeDelta] = useState(10);
  const [longitudeDelta, setLongitudeDelta] = useState(10);
  const router = useRouter();
  const [shopMarkers, setShopMarkers] = useState([]);

  useEffect(() => {
    getShops()
    .then((shops) => {
      setShopMarkers(shops);
    })
  }, []);

  function changeRegion(region) {
    // setLatitude(region.latitude);
    // setLongitude(region.longitude);
    // setLatitudeDelta(region.latitudeDelta);
    // setLongitudeDelta(region.longitudeDelta);
  }

  function findLocation() {
    const searchString = encodeURI(searchText.trim());
    setSearchText("");
    getLocation(searchString)
      .then((response) => {
        setLatitude(
          response.data.resourceSets[0].resources[0].point.coordinates[0]
        );
        setLongitude(
          response.data.resourceSets[0].resources[0].point.coordinates[1]
        );
        setLatitudeDelta(0.5);
        setLongitudeDelta(0.5);
      })
      .catch((error) => {
        console.log("error>", error);
      });
  }

  function goToShop(shopObject) {
    router.push({
      pathname: "/home/ViewFoodList",
      params: shopObject,
    });
  }

  return (
    <>
      <Stack.Screen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        options={{ headerShown: true, title: "eatBay" }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MapView
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
          onRegionChangeComplete={(region) => {
            changeRegion(region);
          }}
          style={{ width: "100%", height: "100%" }}
          provider={PROVIDER_GOOGLE}
        >
          {shopMarkers.map((shopMarker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: shopMarker.latitude,
                longitude: shopMarker.longitude,
              }}
              title={shopMarker.shop_name}
              shop_id={shopMarker.shop_id}
              address={shopMarker.address}
              pickUpTimes={shopMarker.pickup_times}
              pinColor={shopMarker.food_count > 0 ? "tomato" : "gold"}
              onPress={(e) => {
                goToShop(e._dispatchInstances.memoizedProps);
              }}
            />
          ))}
        </MapView>
        <View style={{ position: "absolute", top: 10, width: "100%" }}>
          <TextInput
            style={{
              borderRadius: 10,
              margin: 10,
              color: "#000",
              borderColor: "#666",
              backgroundColor: "#FFF",
              borderWidth: 1,
              height: 45,
              paddingHorizontal: 10,
              fontSize: 18,
            }}
            placeholder={"Search"}
            placeholderTextColor={"#666"}
            onChangeText={setSearchText}
            value={searchText}
            onSubmitEditing={findLocation}
          />
        </View>
      </View>
    </>
  );
}
