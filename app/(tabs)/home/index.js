import { View, StyleSheet, TextInput, Image, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Stack, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { getLocation } from "../../../src/api/mapApi";
import { getShops } from "../../../src/api/backEndApi";
import { MapContext } from "../../contexts/MapContext";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [shopMarkers, setShopMarkers] = useState([]);
  const { region, setRegion } = useContext(MapContext);
  const [latitude, setLatitude] = useState(region.latitude);
  const [longitude, setLongitude] = useState(region.longitude);
  const [latitudeDelta, setLatitudeDelta] = useState(region.latitudeDelta);
  const [longitudeDelta, setLongitudeDelta] = useState(region.longitudeDelta);

  useEffect(() => {
    getShops().then((shops) => {
      setShopMarkers(shops);
    });
  }, []);

  function changeRegion(region) {
    setRegion(region);
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
        Alert.alert("Error", "Sorry, location not found", [{ text: "OK" }]);
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
        options={{
          headerTitle: () => (
            <Image
              style={{ width: 80, height: 25 }}
              source={require("../../../assets/logo-small.png")}
            />
          ),
          headerBackTitle: "",
        }}
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
            placeholder={"Search for location"}
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
