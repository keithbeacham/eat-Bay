import { View, StyleSheet, TextInput } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { getLocation } from "../../../src/api/mapApi";

const markers = [
  {
    id: 1,
    latitude: 51.00252,
    longitude: -1.49868,
    title: "Greggs",
    description: "Greggs, Romsey",
    hasFood: true,
  },
  {
    id: 2,
    latitude: 50.97301,
    longitude: -1.35325,
    title: "Greggs",
    description: "Greggs, Eastleigh",
    hasFood: false,
  },
  {
    id: 3,
    latitude: 50.90478,
    longitude: -1.40456,
    title: "Greggs",
    description: "Greggs, Above Bar Street, Southampton",
    hasFood: true,
  },
];

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [latitude, setLatitude] = useState(54.093);
  const [longitude, setLongitude] = useState(-2.895);
  const [delta, setDelta] = useState(8);
  const router = useRouter();

  function changeRegion(region) {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
    setDelta(region.latitudeDelta);
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
        setDelta(0.5);
      })
      .catch((error) => {
        console.log("error>", error);
      });
  }

  function goToShop(shopId) {
    router.push({
      pathname: "/home/ViewFoodList",
      params: { shop_id: shopId },
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
          justifyContent: "spaceBetween",
          alignItems: "center",
        }}
      >
        <MapView
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: delta,
            longitudeDelta: delta,
          }}
          onRegionChangeComplete={(region) => {
            changeRegion(region);
          }}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              shop_id={marker.id}
              description={marker.description}
              pinColor={marker.hasFood ? "tomato" : "gold"}
              onPress={(e) =>
                goToShop(e._dispatchInstances.memoizedProps.shop_id)
              }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
