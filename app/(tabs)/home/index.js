import { View, StyleSheet, Text, TextInput } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Stack, Link } from "expo-router";
import { useEffect, useState } from "react";
import { getLocation } from "../../../src/api/mapApi";

const markers = [
  {
    id: 1,
    latitude: 51.00252,
    longitude: -1.49868,
    title: "Greggs",
    description: "Greggs, Romsey",
  },
  {
    id: 2,
    latitude: 50.97301,
    longitude: -1.35325,
    title: "Greggs",
    description: "Greggs, Eastleigh",
  },
  {
    id: 3,
    latitude: 50.90478,
    longitude: -1.40456,
    title: "Greggs",
    description: "Greggs, Above Bar Street, Southampton",
  },
];

export default function Home() {
  const [latitude, setLatitude] = useState(54.093);
  const [longitude, setLongitude] = useState(-2.895);
  const [delta, setDelta] = useState(8);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {}, []);

  function findLocation() {
    const searchString = encodeURI(searchText);
    getLocation(searchString)
      .then((response) => {
        setLatitude(response.resourceSets[0].point.coordinates[0]);
        setLongitude(response.resourceSets[0].point.coordinates[1]);
        setDelta(1);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MapView
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: delta,
            longitudeDelta: delta,
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
              description={marker.description}
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
        <Link href={"/home/ViewFoodList"}>
          <Text>Press to go to View food list</Text>
        </Link>
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
    height: "95%",
  },
});
