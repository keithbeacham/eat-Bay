import React, { useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Stack } from "expo-router";
import MapView from "react-native-maps";
import { MapContext } from "../../contexts/MapContext";

export default function AboutUs() {
  const { region, setRegion } = useContext(MapContext);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: false, headerLeft: () => (
            <View style={{ flexDirection: 'row' }} >
              <Image
                style={{ marginRight: 10 }} 
                source={require('../../../assets/logo.png')}
              />
            </View>
          ) }} />
      <MapView
        style={styles.map}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={region}
      />
      <View style={styles.pageContainer}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>About us</Text>
        <Image
                style={{ marginTop: 10, marginBottom: 0 }} 
                source={require('../../../assets/aboutus.png')}
              />
        <Text style={{ fontSize: 13, marginLeft: 30, marginRight: 30, marginTop: 15 }}>
          A long time ago in a galaxy far, far away Luke Skywalker has returned
          to his home planet of Tatooine in an attempt to rescue his friend Han
          Solo from a shortage of affordable food.{"\n"}{"\n"}Little does Luke know that
          the GALACTIC FOOD INDUSTRY wastes 40% of the food it produces. With
          the help of the REBEL FOOD ALLIANCE Luke works on a secret weapon to
          free the Galaxy from the tyranny of wasted food.{"\n"}{"\n"}When completed, this
          ultimate tool - EATBAY - will restore freedom to the galaxy and save
          the planets...
        </Text>
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
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 10,
    borderRadius: 10,
  },
});
